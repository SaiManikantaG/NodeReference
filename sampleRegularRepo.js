import BaseRepository from './baseRepository';
import sampleModel from '../models/sampleModel';

class sampleRepository extends BaseRepository {
  constructor() {
    super(sampleModel);
  }
}

export default new sampleRepository();
