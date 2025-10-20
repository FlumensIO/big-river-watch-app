import { Collection, CollectionOptions } from 'common/flumens';
import Record from 'models/record';
import { recordsStore } from '../store';

export class RecordsCollection<T extends Record> extends Collection<T> {
  constructor(options: CollectionOptions<T>) {
    super({ id: 'records', Model: Record, ...options });
  }

  async fetch() {
    if (!this.store || !this.Model) {
      this.ready.resolve(false);
      return;
    }

    const modelsJSON = await this.store.findAll();

    const getModel = (json: any) => {
      const { data, metadata, media, attrs } = json.data;
      return new (this.Model as any)({
        ...json,
        attrs,
        data,
        metadata,
        media,
      });
    };
    const models = modelsJSON.map(getModel);
    this.data.push(...models);

    this.ready.resolve(true);
  }
}

const records = new RecordsCollection({
  store: recordsStore,
  Model: Record,
});

export default records;

export function getPending() {
  const byUploadStatus = (sample: Record) =>
    !sample.syncedAt && sample.metadata.saved;

  return records.filter(byUploadStatus);
}
