/* eslint no-unused-vars:0 */
/* eslint no-underscore-dangle:0 */
const assert = require('assert');

const BuggyHealthSyncer = require('./buggy-health-syncer.js');
const MockHTTPClient = require('./mock-http-client.js');
const MockHealthKit = require('./mock-healthkit.js');

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