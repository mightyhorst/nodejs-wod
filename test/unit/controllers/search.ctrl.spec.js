const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const mockery = require('mockery');

/**
* Mocks/Fakes/Stubs
**/
const loginEntries = [{
    "user": "user5",
    "sitecode": 9014,
    "timestamp": "2019-04-11"
}]
const elasticSearchService = {
	searchLogins: function(dateRangeContract){
		return loginEntries
	}
}



/**
* Imports
**/
// import { SearchController } from '../../../api/controllers/search.controller';

var ctrl;


describe('SearchController', async function() {

	
	before(function() {
	    mockery.enable({
	    	warnOnUnregistered: false
	    })

	    mockery.registerMock('../ioc', {
	    	IoC: {
		    	make: function(di){
		    		return elasticSearchService
		    	}
	    	}
	    })

	    let SearchController = require('../../../api/controllers/search.controller').SearchController;
	    ctrl = new SearchController(elasticSearchService);

	})

	after(function() {
	    mockery.disable()
	})
	

	describe('#search', async function() {
		it('should return {data: LoginEntry[]} ', async function() {
			
			let req = httpMocks.createRequest({
				method: 'GET',
				url: '/api/v1/logins?start=2018-11-12&end=2020-01-02',
			})
			let res = httpMocks.createResponse();

			await ctrl.search(req, res);
			
			let data = JSON.parse(res._getData());
	      	expect(data).to.deep.equal({data: loginEntries});

		})
	})

	
})