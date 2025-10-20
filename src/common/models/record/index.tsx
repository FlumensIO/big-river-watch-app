import { intercept, IObservableArray, observable } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  Model,
  ModelValidationMessage,
  useAlert,
  ModelAttrs,
  ModelOptions,
  device,
  Location,
} from '@flumens';
import config from 'common/config';
import supabase from 'common/supabase';
import Media from '../media';
import { recordsStore } from '../store';
import { Attrs as UserAttrs } from '../user';
import GPSExtension from './GPSExt';

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

type Metadata = {
  /**
   * If the record was saved and ready for upload.
   */
  saved?: boolean;
};

export interface Remote {
  synchronising?: boolean;
}

export default class Record extends Model<Attrs> {
  metadata: Metadata;

  media: IObservableArray<Media>;

  gps: any;

  startGPS: any;

  stopGPS: any;

  isGPSRunning: any;

  gpsExtensionInit: any;

  collection?: any;

  constructor({
    metadata,
    media = [],
    ...options
  }: ModelOptions & { metadata?: Metadata; media?: any[] } = {}) {
    super({ store: recordsStore, ...options });

    const getMedia = (m: any) => new Media(m);
    this.media = observable(media?.map(getMedia));

    this.metadata = observable(metadata || {}) as any;

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
    return !!this.syncedAt;
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
        this.updatedAt = new Date(updated_at).getTime();
        this.syncedAt = new Date(updated_at).getTime();

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

  private async _createRemote({ data }: any, media: string[]): Promise<any> {
    const {
      deleted = false,
      firstName,
      lastName,
      email,
      allowContact,
      postcode,
      experience,
      ...dataOther
    } = data;

    const user = {
      firstName,
      lastName,
      email,
      allowContact,
      postcode,
      experience,
    };

    try {
      const res = await supabase
        .from('records')
        .insert([
          { cid: this.cid, data: dataOther, user_data: user, deleted, media },
        ]);

      if (res.error) {
        const error: any = new Error(res.error.message);
        error.status = res.status;
        throw error;
      }

      return this._fetchRecordMetaByCid();
    } catch (e: any) {
      const isDuplicate =
        e.status === 409 && e.message.includes('records_external_id_key');
      if (isDuplicate) {
        return this._fetchRecordMetaByCid();
      }

      //  TODO: timeout?

      throw e;
    }
  }

  async _fetchRecordMetaByCid() {
    const res = await supabase
      .from('records_public')
      .select('*')
      .eq('cid', this.cid);
    if (res.error) throw res.error;
    return res.data[0];
  }

  /**
   * Returns a clean (no observables) JSON representation of the model.
   */
  toJSON() {
    const json: any = super.toJSON();

    const getMedia = (model: Media) => model.toJSON();

    return JSON.parse(
      JSON.stringify({
        ...json,
        metadata: this.metadata,
        media: this.media?.map(getMedia) || [],
      })
    );
  }

  /**
   * Save the model to the offline store.
   */
  async save() {
    if (!this.store) {
      throw new Error('Trying to sync locally without a store');
    }

    const { data, metadata, media, ...other } = this.toJSON();
    const jsonWithDataWrapper = {
      ...other,
      data: {
        data,
        metadata,
        media,
      },
    };
    await this.store.save(jsonWithDataWrapper);
  }

  /**
   * Destroy the model and remove from the offline store.
   */
  async destroy() {
    const destroySubModels = () =>
      Promise.all(this.media.map((media: any) => media.destroy(true))); // eslint-disable-line @getify/proper-arrows/name

    if (!this.store) {
      throw new Error('Trying to sync locally without a store');
    }

    await this.store.delete(this.cid);

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
  const date1 = new Date(record1.data.date);
  const moveToTop = !date1 || date1.toString() === 'Invalid Date';
  if (moveToTop) return -1;

  const date2 = new Date(record2.data.date);
  return date2.getTime() - date1.getTime();
}
