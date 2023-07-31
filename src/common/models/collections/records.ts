import { initStoredSamples } from '@flumens';
import Record from 'models/record';
import { modelStore } from '../store';

console.log('Records: initializing');
const samplesCollection = initStoredSamples(modelStore, Record);

export default samplesCollection;
