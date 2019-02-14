'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.IoC = undefined;

var _index = require('./services/index');

var ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST || 'localhost:9200';

/**
* Imports
**/
// import {elasticsearch} from 'elasticsearch';
var elasticSearch = require('elasticsearch');


/**
* Vendor 
**/
var elasticSearchVendor = new elasticSearch.Client({
	host: ELASTICSEARCH_HOST,
	log: 'trace'
});

/**
* Services 
**/
var elasticSearchService = new _index.ElasticSearchService(elasticSearchVendor);

var IoC = exports.IoC = {
	make: function make(di) {
		switch (di) {
			case 'vendor.elastic-search':
				return elasticSearchVendor;

			case 'service.elastic-search':
				return elasticSearchService;

		}
	}
};