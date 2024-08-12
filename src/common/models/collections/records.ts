import { initStoredSamples } from '@flumens';
import Record from 'models/record';
import { modelStore } from '../store';

console.log('Records: initializing');
const samplesCollection = initStoredSamples(modelStore, Record);

export default samplesCollection;

export function getPending() {
  const byUploadStatus = (sample: Record) =>
    !sample.metadata.syncedOn && sample.metadata.saved;

  return samplesCollection.filter(byUploadStatus);
}
