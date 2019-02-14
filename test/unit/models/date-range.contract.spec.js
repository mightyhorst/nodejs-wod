const chai = require('chai')
const expect = chai.expect;
chai.use(require('chai-datetime'));

/**
* Imports
**/
import { DateRangeContract } from '../../../api/models/contracts/date-range.contract';
import { ModelValidationError } from '../../../api/shared/Errors';

/**
* Fakes
**/
const startStr 	= '2000-01-01';
const endStr 	= '2020-12-31';
const startDate = new Date(startStr);
const endDate 	= new Date(endStr);
const query = {
    'query': {
        'range' : {
            'timestamp' : {
                'gte' : startDate.toISOString(),
                'lte' : endDate.toISOString()
            }
        }
    }
}


describe('DateRangeContract', function() {

	const contract = new DateRangeContract(startStr, endStr);

	describe('#constructor', function() {

		it('should create a new DateRangeContract', function() {
			
			expect(contract.__proto__).to.have.own.property('toElasticSearchQuery');
			
		})

		it('should be valid start date', function() {
			
			expect(contract.startDate).to.equalDate(new Date(startStr));

		})
		it('should be valid end date', function() {
			
			expect(contract.endDate).to.equalDate(new Date(endStr));

		})
		it('should throw ModelValidationError when start date string is invalid ISO 8601', function() {
			function fn(){	
				new DateRangeContract('invalid', endStr);
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should throw ModelValidationError when end date string is invalid ISO 8601', function() {
			function fn(){	
				new DateRangeContract(startStr, 'invalid');
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should not throw ModelValidationError ', function() {
			function fn(){	
				new DateRangeContract(startStr, endStr)
			}
			expect(fn).to.not.throw(ModelValidationError)
		})

	})

	describe('#toElasticSearchQuery', function() {
		it('should create an elastic search query', function() {
			
			expect(contract.toElasticSearchQuery()).to.deep.equal(query);
			
		})
	})

	
	
})