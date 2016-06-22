var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
  // gets Root Route
describe('GET /', function() {
  // tests go here
  it('should return a 200 response', function(done) {
    request(app).get('/')
    .expect(200, done);
  });
});
