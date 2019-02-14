const expect = require('chai').expect;

/**
* Mocks/Fakes/Stubs
**/
const sinon = require('sinon');
import {fakeResult, fakeElasticSearch} from '../../../mock/elasticsearch';



/**
* Imports
**/
import { DateRangeContract } from '../../../api/models/contracts/date-range.contract';
import { ElasticSearchService } from '../../../api/services/elastic-search.service';

let service = new ElasticSearchService(fakeElasticSearch);

describe('ElasticSearchService', function() {

	it('should create a new ElasticSearchService', function() {
		
		expect(service.client).to.equal(fakeElasticSearch);
		expect(service.client.__proto__).to.have.own.property('ping');
		expect(service.client.__proto__).to.have.own.property('search');
	})

	describe('#check', function() {
		it('should ping the mock server', function() {
			service
			.check()
			.then(res => {
				expect(res).to.equal(true);
			})
		})
	})

	describe('#searchLogins', function() {
		it('should throw error if not a DateRangeContract', function() {
			expect(service.searchLogins).to.throw(TypeError)
		})

		it('should not throw error if not a DateRangeContract', function() {
			function fn(){	
				let contract = new DateRangeContract('2019-01-01','2019-01-01')
				service.searchLogins(contract);
			}
			expect(fn).to.not.throw(TypeError)
		})

		it('should return json', async function() {
			let contract = new DateRangeContract('2019-01-01','2019-01-01')
			let data = await service.searchLogins(contract);

			expect(data).to.include.deep.ordered.members([{
            	"user": "user5",
            	"sitecode": 9014,
            	"timestamp": "2019-04-11"
          	}]);
		})
	})
})