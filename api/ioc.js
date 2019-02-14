process.env.ELASTICSEARCH_HOST = 'localhost:9200';

/**
* Imports
**/
// import {elasticsearch} from 'elasticsearch';
const elasticSearch = require('elasticsearch');
import {ElasticSearchService} from './services/index';


/**
* Vendor 
**/
const elasticSearchVendor = new elasticSearch.Client({
    host: process.env.ELASTICSEARCH_HOST,
    log: 'trace'
});

/**
* Services 
**/
const elasticSearchService = new ElasticSearchService(elasticSearchVendor);

export const IoC = {
	make: function(di) {
		switch(di){
			case 'vendor.elastic-search':
				return elasticSearchVendor;
				
			case 'service.elastic-search':
				return elasticSearchService;
				
		}
	}
};