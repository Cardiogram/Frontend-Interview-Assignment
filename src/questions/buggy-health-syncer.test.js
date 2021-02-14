/* eslint no-unused-vars:0 */
/* eslint no-underscore-dangle:0 */
// To run this test, run:
// node_modules/jest/bin/jest.js src/questions/buggy-health-syncer.test.js --runInBand
const assert = require('assert');

const BuggyHealthSyncer = require('./buggy-health-syncer.js');
const MockHTTPClient = require('./mock-http-client.js');
const MockHealthKit = require('./mock-healthkit.js');

const HEART_RATE_MEASUREMENTS_1 = [
  {
    start: 1467736980 * 1000,  // milliseconds
    end: 1467736983 * 1000,
    value: 67           // 67 beats per minute
  },
  {
    start: 1467737011 * 1000,
    end: 156773707 * 1000,
    value: 65,
  }
];

const HEART_RATE_MEASUREMENTS_2 = [
  {
    start: 1537736980 * 1000,
    end: 1537736983 * 1000,
    value: 62
  },
  {
    start: 1547737011 * 1000,
    end: 154773707 * 1000,
    value: 100,
  },
  {
    start: 1547737018 * 1000,
    end: 154773719 * 1000,
    value: 107,
  }
];

describe('BuggyHealthSyncerTest', () => {
  beforeAll((cb) => {
    this.mockHttpClient = new MockHTTPClient();
    this.mockHealthKit = new MockHealthKit();
    this.healthSyncer = new BuggyHealthSyncer(this.mockHttpClient, this.mockHealthKit);
    return cb();
  });

  test('should handle syncing one batch of sensor measurements', (cb) => {
    this.mockHttpClient.reset();
    this.mockHealthKit.reset();

    // After injecting some fake sensor measurements, we expect them to be posted to the server,
    // causing the internal counters of mockHttpClient to be increased.
    this.mockHealthKit.injectFakeSensorMeasurements('heartRate', HEART_RATE_MEASUREMENTS_1);

    // Need to wait for async code to run...
    setTimeout(() => {
      expect(this.mockHttpClient.numPosts).toEqual(1);
      expect(this.mockHttpClient.numSensorMeasurements).toEqual(2);
      return cb();
    }, 10);
  });

  test('should handle syncing multiple sensor measurements', (cb) => {
    this.mockHttpClient.reset();
    this.mockHealthKit.reset();

    // For this teset case, we inject fake measurements multiple times.
    this.mockHealthKit.injectFakeSensorMeasurements('heartRate', HEART_RATE_MEASUREMENTS_1);
    setTimeout(() => {
      this.mockHealthKit.injectFakeSensorMeasurements('heartRate', HEART_RATE_MEASUREMENTS_2);

      // Need to wait for async code to run...
      setTimeout(() => {
        console.log('etc:' + this.mockHttpClient.numSensorMeasurements);
        expect(this.mockHttpClient.numPosts).toEqual(2);
        expect(this.mockHttpClient.numSensorMeasurements).toEqual(5);
        return cb();
      }, 1000);
    }, 100);
  });

  test('should handle HTTP errors', (cb) => {
    // TODO: add this test case!
    return cb();
  });

  // What else?
});
