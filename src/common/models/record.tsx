import { intercept, IObservableArray, observable } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  Model,
  ModelValidationMessage,
  useAlert,
  ModelAttrs,
  ModelMetadata,
  ModelOptions,
  device,
  Location,
} from '@flumens';
import config from 'common/config';
import supabase from 'common/supabase';
import Media from './media';
import GPSExtension from './recordGPSExt';
import { modelStore } from './store';
import { Attrs as UserAttrs } from './user';

function printErroneousPayload(payload: any) {
  try {
    const MAX_PAYLOAD = 200000; // kb. https://develop.sentry.dev/sdk/event-payloads/
    console.warn(JSON.stringify(payload).substring(0, MAX_PAYLOAD / 2));
  } catch (e: any) {
    // do nothing
  }
}

export type Attrs = ModelAttrs &
  UserAttrs & {
    date: string;
    rain: any;
    riverSpeed: any;
    surveyors: number;
    location: Location;
  };

type Metadata = ModelMetadata & {
  /**
   * If the record was saved and ready for upload.
   */
  saved?: boolean;
};

export interface Remote {
  synchronising?: boolean;
}

export default class Record extends Model {
  static fromJSON(json: any) {
    const { media, ...options } = json;
    const record = new this(options);

    const addMedia = (m: any) => record.media.push(Media.fromJSON(m));
    media?.forEach(addMedia);

    return record;
  }

  declare metadata: Metadata;

  declare attrs: Attrs;

  media: IObservableArray<Media>;

  gps: any;

  startGPS: any;

  stopGPS: any;

  isGPSRunning: any;

  gpsExtensionInit: any;

  collection?: any;

  constructor(options: ModelOptions) {
    super({ store: modelStore, ...options });

    this.media = observable([]);

    const onAddedSetParent = (change: any) => {
      if (change.added && change.added.length) {
        // eslint-disable-next-line no-param-reassign, no-return-assign
        const attachParent = (model: any) => (model.parent = this);
        change.added.forEach(attachParent);
      }

      return change;
    };
    intercept(this.media, onAddedSetParent);

    Object.assign(this, GPSExtension());
  }

  remote: Remote = observable({
    synchronising: false,
  });

  getSurvey(): any {
    return {};
  }

  validateRemote(): any {
    return null;
  }

  cleanUp(): any {
    return null;
  }

  isDisabled() {
    return !!this.metadata.syncedOn;
  }

  isUploaded() {
    return this.isDisabled();
  }

  async upload() {
    if (this.remote.synchronising || this.isUploaded()) {
      return true;
    }

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    this.cleanUp();

    return this.saveRemote();
  }

  async saveRemote() {
    console.log('Uploading record', this.cid);

    try {
      const submission = this.toJSON();
      try {
        this.remote.synchronising = true;
        const mediaRemoteURLs = await this._uploadMedia();
        const { id, updated_at } = await this._createRemote(
          submission,
          mediaRemoteURLs
        );
        this.remote.synchronising = false;

        // update the model with new remote IDs
        this.id = id;

        // update metadata
        this.metadata.updatedOn = new Date(updated_at).getTime();
        this.metadata.syncedOn = new Date(updated_at).getTime();

        this.save();
      } catch (err: any) {
        this.remote.synchronising = false;
        err.payload = submission;

        console.error(err);
        throw new Error(
          'Sorry, we have encountered a problem while uploading the record.'
        );
      }
    } catch (error: any) {
      if (error.status === 400 && error.payload)
        printErroneousPayload(error.payload);

      throw error;
    }
  }

  private async _uploadMedia() {
    if (!this.media.length) return [];

    const upload = (m: Media) => m.saveRemote();
    const promises = this.media.map(upload);
    await Promise.all(promises);

    const getRemoteUrl = (m: Media) =>
      `${config.backend.url}/${config.backend.mediaPath}/${m.id!}`;
    return this.media.map(getRemoteUrl);
  }

  private async _createRemote({ attrs }: any, media: string[]): Promise<any> {
    const { deleted, ...data } = attrs;

    try {
      const res = await supabase
        .from('records')
        .insert([{ cid: this.cid, data, deleted, media }])
        .select();

      if (res.error) {
        const error: any = new Error(res.error.message);
        error.status = res.status;
        throw error;
      }

      return res.data?.[0];
    } catch (e: any) {
      const isDuplicate =
        e.status === 409 && e.message.includes('records_external_id_key');
      if (isDuplicate) {
        const res = await supabase
          .from('records')
          .select('*')
          .eq('cid', this.cid);
        if (res.error) throw res.error;
        return res.data[0];
      }

      //  TODO: timeout?

      throw e;
    }
  }

  /**
   * Returns a clean (no observables) JSON representation of the model.
   */
  toJSON() {
    const data: any = super.toJSON();

    const getMedia = (model: Media) => model.toJSON();
    data.media = this.media?.map(getMedia) || [];

    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Destroy the model and remove from the offline store.
   */
  async destroy() {
    const destroySubModels = () =>
      Promise.all(this.media.map((media: any) => media.destroy(true))); // eslint-disable-line @getify/proper-arrows/name

    if (!this._store) {
      throw new Error('Trying to sync locally without a store');
    }

    await this._store.destroy(this.cid);

    if (this.collection) {
      this.collection.remove(this);
    }

    await destroySubModels();
  }
}

export const useValidateCheck = (record: Record) => {
  const alert = useAlert();
  const { t } = useTranslation();

  // eslint-disable-next-line @getify/proper-arrows/name
  return () => {
    const invalids = record.validateRemote();
    if (invalids) {
      alert({
        header: t('Survey incomplete'),
        skipTranslation: true,
        message: <ModelValidationMessage {...invalids} />,
        buttons: [
          {
            text: t('Got it'),
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };
};

export function bySurveyDate(record1: Record, record2: Record) {
  const date1 = new Date(record1.attrs.date);
  const moveToTop = !date1 || date1.toString() === 'Invalid Date';
  if (moveToTop) return -1;

  const date2 = new Date(record2.attrs.date);
  return date2.getTime() - date1.getTime();
}
