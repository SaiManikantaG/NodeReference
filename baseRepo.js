/* eslint-disable no-unused-vars */
/*
****
**** Usage: Here we need to build the common methods for all repos later we may add validation, logging, etc
**** Author : Sai Manikanta G
*/

import _ from 'lodash';
import { validateRequiredConditions } from '../common/mongodb';
// TODO: we can read this from config later.

const REQUIRED_WHERE_PARAMS = ['storeId'];

// TODO: we need a way to run all the update for one store in a single transaction?
// TODO: Enable validate required conditions .... use lodash deep.

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   *
   * @param {*} where clause
   * @param {*} Select option
   * @param {*} limit option
   * @param {*} skip option
   * Find all the records that match given input parameters
   */
  async find(where, {
    select,
    sort,
    limit,
    skip,
    strict = true,
  } = {}) {
    // if (strict) {
    //   validateRequiredConditions(where, REQUIRED_WHERE_PARAMS);
    // }
    return this.model.find(where, select, {
      sort,
      limit,
      skip,
    }).lean();
  }

  /**
   *
   * @param {*} id
   * @param {*} select option
   * find records based on given input ID in the params
   */
  async findById(id, {
    select = null,
  } = {}) {
    return this.model.findById(id, select).lean();
  }

  /**
   *
   * @param {*} where
   * @param {*} select option
   * @param {*} sort option
   * find a single record based on the where clause and other optional params
   */
  async findOne(where, {
    select = null,
    sort,
  } = {}) {
    // validateRequiredConditions(where, REQUIRED_WHERE_PARAMS);
    return this.model.findOne(where, select, {
      sort,
    }).lean();
  }

  /**
   *
   * @param {*} where condition
   * This is used to get the count of records for given where clause
   */
  async count(where) {
    // deprecation warning, so updated to countDocuments, 2/11/2018.
    return this.model.countDocuments(where);
  }

  /**
   *
   * @param {*} items list
   * This is used to create / save input item data to the DB
   */
  async create(items) {
    return this.model.create(items);
  }

  /**
   *
   * @param  {...any} params
   * update the record based on given input params / clauses
   */
  async update(...params) {
    return this.model.update(...params);
  }

  /**
   *
   * @param  {...any} params
   * update many fields at once based on the given input params / clauses
   */
  async updateMany(...params) {
    return this.model.updateMany(...params);
  }

  // TODO:
  async aggregate(...params) {
    return this.model.aggregate(...params);
  }

  /**
   *
   * @param {*} updates list of data
   * bulk update the DB with the given updates list which contains data and conditions
   */
  async bulkUpdate(updates) {
    const bulk = this.model.collection.initializeUnorderedBulkOp();
    // const bulk = this.model.collection.initializeOrderedBulkOp();
    _.forEach(updates, ({ where, update, options = {} }) => {
      if (options.$upsert) {
        bulk.find(where).upsert().update(update, { ...options });
      } else {
        bulk.find(where).update(update, { ...options });
      }
    });

    // console.log(`bulk updating TIME: ${new Date()}`);
    // logger.debug(`bulk updating TIME: ${new Date()}`);
    const result = await bulk.execute();
    // console.log(`result: ${result}`)
    return result;
  }
}


export default BaseRepository;
