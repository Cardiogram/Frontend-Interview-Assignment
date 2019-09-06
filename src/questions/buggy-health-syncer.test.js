/* eslint no-unused-vars:0 */
/* eslint no-underscore-dangle:0 */
const _ = require('underscore');
const assert = require('assert');

const BuggyHealthSyncer = require('../../common/buggy-health-syncer.js');


/**
 * Mocks out an HTTP client that posts content to a URL.
 */
class MockHTTPClient {
  constructor() {
  };


  /**
   * Mocks out posting a JSON blob to a URL.
   * url - string
   * jsonBody - object
   * callback - callback function(error, httpStatus, responseBody)
   */
  post(url, jsonBody, cb) {
    setTimeout(25, cb(null, 200, {}));
  }
};

class MockHealthKit {
  constructor() {
    // Maps each sensor type (steps, heartRate, ...) to 
    this.sensorTypeToObservers = {};
    // maps each sensor type to a list of data points {start: ..., end: ..., value: ...}.
    this.sensorTypeToDataPoints = {};
  }

  /**
   *
   */ 
  registerObserver(sensorType, healthObserver) {
    if (!this.sensorTypeToObservers[sensorType]) {
      this.sensorTypeToObservers[sensorType] = [];
    }
    this.sensorTypeToObservers[sensorType].push(healthObserver);
  }

  /**
   * Test c
   */
  mockReceivingNewData(sensorType, listOfDataPoints) {
    if (!this.sensorTypeToDataPoints[sensorType]) {
      this.sensorTypeToDataPoints[sensorType] = [];
    }
    const combinedData = this.sensorTypeToDataPoints.concat(listOfDataPoints);
    const sortedData = _.sort(combinedData, (d) => d.start);
    this.sensorTypeToDataPoints
    this.sensorTypeToObservers
  }
};

describe('BuggyHealthSyncerTest', () => {
  beforeAll((cb) => {
    this.mockHttpClient = new MockHTTPClient();
    this.mockHealthKit = new MockHealthKit();
    this.healthSyncer = new BuggyHealthSyncer(this.mockHttpClient, this.healthSyncer);
    return cb();
  });

  test('should handle syncing one type of data', (cb) => {

    return cb();
  });

  // Cases
  //   Test one sync type
  //   Test multiple sync types
  //   Test handles HTTP errors.
  //     -- add this test cse
  //   Test simultaneous calls 
  //    
});