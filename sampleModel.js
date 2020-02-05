import mongoose, { Schema } from 'mongoose';
import { collections } from '../common/utility/globalVariables';
// import { modelConnection } from '../common/utility/dbUtility';
const { SAMPLE_COLL } = collections;

const sampleCollectionSchema = new Schema({
  // Some attributes and their type like id: string
}, {
  strict: false,
  collection: DELIVERY_AGENT,
});

export default mongoose.model(SAMPLE_COLL, sampleCollectionSchema);
