var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true })
  .then(function() {
    done();
  });
});

describe('GET /tacos', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos')
    .expect(200, done);
  });
});

describe('POST /tacos', function() {
  it('should a create a taco and redirect to /tacos', function(done) {
    request(app).post('/tacos')
      .type('form')
      .send({
        name: 'Doritos Locos',
        amount: 9001
      })
      .expect('Location', '/tacos')
      .expect(302, done);
  });
});

describe('PUT /tacos/:id', function() {
    it('should test if entry exists and update it if does', function(done) {
        request(app).put('/tacos/1')
            .type('form')
            .send({
                name: 'Different Name',
                amount: 30
            })
            .expect(200, done);
            });
    });

describe('GET /tacos/:id/edit', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos/1/edit')
    .expect(200, done);
  });
});

describe('GET /tacos/:id', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos/1')
    .expect(200, done);
  });
});

describe('DELETE /tacos/:id', function() {
  it('should delete a taco and send a success message and send a 200', function(done) {
      request(app).delete('/tacos/1')
        .end(function(err, response) {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.have.property('msg');
          expect(response.body.msg).to.equal('success');
          done();
        });
  });
});


describe('DELETE /tacos/:id', function() {
  it('should test if there is an entry in our database to delete', function(done) {
      request(app).delete('/tacos/1')
        .end(function(err, response) {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.have.property('msg');
          expect(response.body.msg).to.equal('error');
          done();
        });
  });
});


describe('PUT /tacos/:id', function() {
    it('should test if there is no entry to update', function(done) {
        request(app).put('/tacos/1')
            .type('form')
            .send({
                name: 'Different Name',
                amount: 30
            })
            .expect(404, done);
            });
    });


describe('GET /tacos/new', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos/new')
    .expect(200, done);
  });
});

describe('GET /tacos/:id/edit', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos/1/edit')
    .expect(404, done);
  });
});


describe('GET /tacos/:id', function() {
  it('should return a 200 status code', function(done) {
    request(app).get('/tacos/1')
    .expect(404, done);
  });
});
