'use strict';

var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('search controller', function () {

    describe('search', function () {

        var expected = 'GET /api/v1/logins?start=...&end=...\n        \n        Content-Type: application/json;charset=utf8\n        \n        {\n            "data": [\n                {\n                    "user": "user1",\n                    "sitecode": 9014,\n                    "timestamp": "2019-02-11T00:00:00Z"\n                }\n            ]\n        }';

        describe('GET /api/v1/logins?start=...&end=...', function () {

            var login = {
                "sitecode": 9014,
                "timestamp": "2019-04-11",
                "user": "user5"
            };

            it('should return a list of login entries: ' + expected, function (done) {

                request(server).get('/api/v1/logins').query({ start: '2018-11-12', end: '2020-01-02' }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200).end(function (err, res) {

                    should.not.exist(err);

                    console.log('res.body.data---->', res.body.data);

                    res.body.data[0].should.eql(login);
                    done();
                });
            });
        });
    });
});