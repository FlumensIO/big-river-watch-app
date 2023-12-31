/* eslint-disable @getify/proper-arrows/name */
import { Capacitor } from '@capacitor/core';
import {
  Filesystem,
  Directory as FilesystemDirectory,
} from '@capacitor/filesystem';
import { Model, ModelAttrs, createImage, getBlobFromURL } from '@flumens';
import { isPlatform } from '@ionic/core';
import config from 'common/config';
import supabase from 'common/supabase';
import Record from './record';

export type DataURI = string;

export type URL = string;

export interface Attrs extends ModelAttrs {
  type?: string;
  data?: any;
  path?: string | null;
  remoteURL?: string;
}

const isHybrid =
  !!(window as any).cordova || !!(window as any)?.Capacitor?.isNative;

class Media extends Model {
  declare attrs: Attrs;

  static fromJSON(json: any) {
    return new this(json);
  }

  /**
   * Transforms and resizes an image file into a string.
   * Can accept file image path and a file input file.
   *
   * @param onError
   * @param file
   * @param onSaveSuccess
   * @returns {number}
   */
  static getDataURI(
    file: any,
    options: any = {}
  ): Promise<
    [dataURI: DataURI, fileType: string, width: number, height: number]
  > {
    const promise = new Promise<any>((fulfill, reject) => {
      // file paths
      if (typeof file === 'string') {
        // get extension
        let fileType = file.replace(/.*\.([a-z]+)$/i, '$1');
        if (fileType === 'jpg') fileType = 'jpeg'; // to match media types image/jpeg

        Media.resize(file, fileType, options.width, options.height).then(
          (args: any) => {
            const [image, dataURI] = args;
            fulfill([dataURI, fileType, image.width, image.height]);
          }
        );
        return;
      }

      // file inputs
      if (!window.FileReader) {
        reject(new Error('No File Reader'));
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        if (options.width || options.height) {
          // resize
          Media.resize(
            event.target?.result as string,
            file.type,
            options.width,
            options.height
          ).then((args: any) => {
            const [image, dataURI] = args;
            fulfill([dataURI, file.type, image.width, image.height]);
          });
        } else {
          const image = new window.Image(); // native one

          image.onload = () => {
            const type = file.type.replace(/.*\/([a-z]+)$/i, '$1');
            fulfill([event.target?.result, type, image.width, image.height]);
          };
          image.src = event.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    });

    return promise;
  }

  /**
   * http://stackoverflow.com/questions/2516117/how-to-scale-an-image-in-data-uri-format-in-javascript-real-scaling-not-usin
   */
  static resize(
    data: URL | DataURI,
    fileType: string,
    MAX_WIDTH?: number,
    MAX_HEIGHT?: number
  ) {
    const promise = new Promise(fulfill => {
      const image = new window.Image(); // native one

      image.onload = () => {
        let { width } = image;
        let { height } = image;
        const maxWidth = !MAX_WIDTH || MAX_WIDTH > width ? width : MAX_WIDTH;
        const maxHeight =
          !MAX_HEIGHT || MAX_HEIGHT > height ? height : MAX_HEIGHT;

        let res = null;

        // resizing
        if (width > height) {
          res = width / maxWidth;
        } else {
          res = height / maxHeight;
        }

        width /= res;
        height /= res;

        // Create a canvas with the desired dimensions
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // Scale and draw the source image to the canvas
        canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);

        // Convert the canvas to a data URL in some format
        fulfill([image, canvas.toDataURL(fileType)]);
      };

      image.src = data;
    });

    return promise;
  }

  /**
   * Create new image model with a photo
   * @param ImageModel Class representing the model.
   * @param imageURL
   * @param dataDirPath
   * @returns
   */
  static async getImageModel(
    imageURL: URL,
    dataDirPath: string
  ): Promise<Media> {
    const MediaClass = this; // https://stackoverflow.com/questions/40765805/es6-get-access-to-class-constructor-from-static-function

    if (!imageURL) {
      throw new Error('File not found while creating image model.');
    }

    let width;
    let height;
    let data;

    if (isHybrid) {
      const image = await createImage(imageURL);

      width = image.width;
      height = image.height;

      data = imageURL.split('/').pop();
    } else {
      [data, , width, height] = await MediaClass.getDataURI(imageURL, {
        width: 1500,
        height: 1500,
      });
    }

    const imageModel = new MediaClass({
      attrs: {
        data,
        type: 'jpg',
        width,
        height,
        path: dataDirPath,
      },
    });

    return imageModel;
  }

  parent?: Record = this.parent;

  async destroy(silent?: boolean) {
    console.log('MediaModel: destroying.');

    // remove from internal storage
    if (!isPlatform('hybrid')) {
      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
    }

    const URL = this.attrs.data;

    try {
      if (this.attrs.path) {
        // backwards compatible - don't delete old media
        await Filesystem.deleteFile({
          path: URL,
          directory: FilesystemDirectory.Data,
        });
      }

      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
    } catch (err) {
      console.error(err);
    }
  }

  async sync() {
    return this.parent ? this.parent.sync() : super.sync();
  }

  async saveRemote() {
    if (this.id) {
      console.log('Media already uploaded');
      return null;
    }

    console.log('Uploading media', this.cid);

    const { type } = this.attrs;
    let extension = type;
    let mediaType = type;
    if (type?.match(/image.*/)) {
      [, extension] = type.split('/');
    } else {
      mediaType = `image/${mediaType}`;
    }

    const url = this.getURL();

    const blob: any = await getBlobFromURL(url, mediaType as string);

    const fileName = `${this.cid}.${extension}`;

    try {
      const res = await supabase.storage
        .from('media')
        .upload(`public/${fileName}`, blob, { upsert: false });

      if (res.error) throw new Error(res.error.message); // https://github.com/supabase/storage-api/issues/273

      this.id = res.data.path;
    } catch (error: any) {
      if (error.message.includes('The resource already exists')) {
        console.log('Recovering duplicate remote image path');
        this.id = `public/${fileName}`;
        return this.save();
      }

      throw error;
    }

    return this.save();
  }

  async save() {
    this.parent?.save();
  }

  getURL() {
    const { data: name } = this.attrs;

    if (!isPlatform('hybrid') || process.env.NODE_ENV === 'test') {
      return name;
    }

    return Capacitor.convertFileSrc(`${config.dataPath}/${name}`);
  }

  /**
   * Resizes itself.
   */
  resize(MAX_WIDTH: number, MAX_HEIGHT: number) {
    const that = this;
    const promise = new Promise((fulfill, reject) => {
      Media.resize(
        this.getURL(),
        this.attrs.type as string,
        MAX_WIDTH,
        MAX_HEIGHT
      )
        .then((args: any) => {
          const [image, data] = args;
          that.attrs.data = data;
          fulfill([image, data]);
        })
        .catch(reject);
    });
    return promise;
  }

  isUploaded() {
    if (!this.parent) {
      throw new Error('No media parent to return disabled status.');
    }

    return this.parent.isUploaded();
  }

  isDisabled() {
    return this.isUploaded();
  }
}

export default Media;
