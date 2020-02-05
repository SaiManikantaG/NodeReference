/* eslint-disable */

import { expect, assert } from "chai";
import rewire from "rewire";
import _ from "lodash";
import { getResultDataMaps } from "../../service/default/buildResultMap";
import sinon from "sinon";
import * as countWrapper from "../../service/default/countingWrapper";

describe("Should generate itemdetails needs for each of the vendor orders", function () {
  var privateFunction;
  var methodCall;
  var eachStoreDataMap = new Map();
  before(() => {
    var privateFunc = rewire("../../service/default/buildResultMap.js");
    privateFunction = privateFunc.__get__("eachDayFilter");
    methodCall = sinon
      .stub(countWrapper, "generateCountsMap")
      .returns({
        message: "success calling counting wrapper",
        function: "generateCountsMap"
      });
    eachStoreDataMap.set("DAILY FRESH FOODS", ["1"]);
  });

  it("call private function and generate only required order vendors only", async () => {
    const resultSet = privateFunction(
      eachStoreDataMap,
      "constantsLookUpMap",
      "psaCategoryDetails",
      "DAILY FRESH FOODS",
      "merchandiseVendorDetails"
    );
    expect(resultSet).to.not.null;
    expect(resultSet.message).to.equal("success calling counting wrapper");
    expect(resultSet.function).to.equal("generateCountsMap");
    sinon.assert.calledOnce(methodCall);
  });

  after(() => {
    methodCall.restore();
  });
});

describe("Should generate emoty data needed for each of the vendor orders if no matches are found", function () {
  var privateFunction;
  var eachStoreDataMap = new Map();
  before(() => {
    var privateFunc = rewire("../../service/default/buildResultMap.js");
    privateFunction = privateFunc.__get__("eachDayFilter");
    eachStoreDataMap.set("DAILY FRESH FOODS", []);
  });

  it("Should throw error for invalid data", async () => {
    expect(() => {
      privateFunction(
        eachStoreDataMap,
        "constantsLookUpMap",
        "psaCategoryDetails",
        "DAILY-OTHER",
        "merchandiseVendorDetails"
      );
    }).to.throw;
  });

  it("No stubing, call private function with empty order data and should recieve empty results", async () => {
    const resultSet = privateFunction(
      eachStoreDataMap,
      "constantsLookUpMap",
      "psaCategoryDetails",
      "DAILY FRESH FOODS",
      "merchandiseVendorDetails"
    );
    expect(resultSet).to.not.null;
    expect(resultSet.orderGroups).to.not.null;
    expect(resultSet.orderGroups).to.have.lengthOf(0);
  });
});

describe("Should generate result data for each of the cycle type or as per existance", function () {
  var lookupMap = new Map();
  var storeBlockMap = new Map();
  var privateFunction;
  var methodCall;
  var eachStoreDataMap = new Map();
  var vendorDetailNames;
  var psaMap = new Map();
  before(() => {
    lookupMap
      .set("order_cycle_type-D", "DAILY FRESH FOODS")
      .set("order_cycle_type-G", "GUIDED REPLENISHMENT")
      .set("order_cycle_type-O", "DAILY-OTHER")
      .set("order_cycle_type-N", "NON-DAILY");
    storeBlockMap.set("37128-178274", 1);
    var privateFunc = rewire("../../service/default/buildResultMap.js");
    privateFunction = privateFunc.__get__("eachDayFilter");
    methodCall = sinon
      .stub(countWrapper, "generateCountsMap")
      .returns([
        {
          message: "success calling counting wrapper",
          function: "generateCountsMap"
        }
      ]);
    eachStoreDataMap.set("DAILY FRESH FOODS", ["1"]);
    vendorDetailNames = new Map();
    vendorDetailNames
      .set("74746", "random1 vendor")
      .set("74756", "random2 vendor")
      .set("73746", "random3 vendor")
      .set("36803", "random4 vendor");
    psaMap.set("37126-1234", 1);
  });

  it("should generate result data map and return which ever cycle type contains the data", async () => {
    const resultSet = getResultDataMaps(
      lookupMap,
      vendorDetailNames,
      eachStoreDataMap,
      psaMap,
      null
    );
    expect(resultSet).to.not.null;
    assert.deepEqual(resultSet["DAILY FRESH FOODS"][0], {
      message: "success calling counting wrapper",
      function: "generateCountsMap"
    });
    expect(resultSet["DAILY FRESH FOODS"]).to.have.lengthOf(1);
    expect(resultSet["DAILY FRESH FOODS"][0].message).to.equal(
      "success calling counting wrapper"
    );
    expect(resultSet["DAILY FRESH FOODS"][0].function).to.equal(
      "generateCountsMap"
    );
    expect(resultSet["DAILY-OTHER"].orderGroups).to.have.lengthOf(0);
    expect(resultSet["NON-DAILY"].orderGroups).to.have.lengthOf(0);
    expect(resultSet["GUIDED REPLENISHMENT"].orderGroups).to.have.lengthOf(0);
  });

  after(() => {
    methodCall.restore();
  });
});
