'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElasticSearchService = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _loginEntry = require('../models/login-entry.model');

var _dateRange = require('../models/contracts/date-range.contract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX || 'wod';

/**
* Imports 
**/

/**
* @class ElasticSearchService - service to query elatic search 
* @requires LoginEntry
* @requires DateRangeContract
**/
var ElasticSearchService = exports.ElasticSearchService = function () {

    /**
     * Connect to the client 
    * @param {Client} client
    */
    function ElasticSearchService(client) {
        (0, _classCallCheck3.default)(this, ElasticSearchService);

        this.client = client;
    }

    /**
    * Check
    * @return {Promise<boolean,string>}
    **/


    (0, _createClass3.default)(ElasticSearchService, [{
        key: 'check',
        value: function check() {
            var _this = this;

            return new Promise(function (done, fail) {
                _this.client.ping({
                    requestTimeout: 30000
                }, function (error) {
                    if (error) {
                        console.error('elasticsearch cluster is down!', { err: error });
                        fail(false); //('elasticsearch cluster is down!', {err:error});
                    } else {
                        console.log('All is well');
                        done(true);
                    }
                });
            });
        }

        /**
        * Search Login Entries 
        * @params {DateRangeContract} dateRangeContract 
        * @return {Promise<results>} hits - results from the query 
        * @throws {TypeError} not a {DateRangeContract} 
        * @throws {ModelValidationError} not valid {LoginEntry}
        **/

    }, {
        key: 'searchLogins',
        value: function searchLogins(dateRangeContract) {

            if (dateRangeContract.constructor.name !== 'DateRangeContract') throw new TypeError('expected a DateRangeContract');

            return this.client.search({
                index: ELASTICSEARCH_INDEX,
                body: dateRangeContract.toElasticSearchQuery()
            }).then(function (resp) {
                /*@todo logger*/
                return resp.hits.hits.map(function (hit) {
                    return hit._source;
                });
            }).then(function (hits) {
                /*@todo logger*/
                return hits.map(function (hit) {
                    return new _loginEntry.LoginEntry(hit);
                });
            }).then(function (logins) {
                /*@todo logger*/
                return logins.map(function (login) {
                    return login.toJson();
                });
            }).catch(function (err) {
                console.trace(err.message);
            });
        }
    }]);
    return ElasticSearchService;
}();

// export const elasticSearchSingleton = new ElasticSearchService();