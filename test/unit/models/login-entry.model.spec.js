const chai = require('chai')
const expect = chai.expect;

/**
* Imports
**/
import { LoginEntry } from '../../../api/models/login-entry.model';
import { ModelValidationError } from '../../../api/shared/Errors';

/**
* Fakes
**/
const validJson = { 
	user: 'user3',
  	sitecode: 9220,
  	timestamp: '2020-02-01'
}
const validModel = new LoginEntry(validJson)

describe('LoginEntry', function() {

	describe('#constructor', function() {

		it('should create a new LoginEntry', function() {
			
			expect(validModel.__proto__).to.have.own.property('toJson');
			
		})

		it('should be valid when user, sitecode, timestamp', function() {
			
			expect(validModel.user).to.equal(validJson.user);
			expect(validModel.sitecode).to.equal(validJson.sitecode);
			expect(validModel.timestamp).to.equal(validJson.timestamp);

		})
		it('should not throw ModelValidationError when user, sitecode, timestamp', function() {
			function fn(){	
				new LoginEntry(validJson)
			}
			expect(fn).to.not.throw(ModelValidationError)
		})
		it('should throw ModelValidationError when user missing', function() {
			function fn(){	
				let invalid = Object.assign({}, validJson);
				delete invalid['user'];
				new LoginEntry(invalid)
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should throw ModelValidationError when sitecode missing', function() {
			function fn(){	
				let invalid = Object.assign({}, validJson);
				delete invalid['sitecode'];
				new LoginEntry(invalid)
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should throw ModelValidationError when timestamp missing', function() {
			function fn(){	
				let invalid = Object.assign({}, validJson);
				delete invalid['timestamp'];
				new LoginEntry(invalid)
			}
			expect(fn).to.throw(ModelValidationError)
		})
	})

	describe('#toJson', function() {
		it('should return as json', function() {
			
			expect(validModel.toJson()).to.deep.equal(validJson);
			
		})
	})

	
	
})