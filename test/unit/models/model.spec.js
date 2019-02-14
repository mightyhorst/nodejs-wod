const expect = require('chai').expect;

/**
* Imports
**/
import { Model } from '../../../api/models/model';
import { ModelValidationError } from '../../../api/shared/Errors';

/**
* Fakes
**/
let model = new Model();
let json = {
	validString: 'I am a string',
	invalidString: false,
	validInt: 1,
	invalidInt: 'not an int',
	validEnum: 'one',
	invalidEnum: 'not_in_the_list'
}

describe('Model', function() {

	it('should create a new Model', function() {
		
		expect(model.__proto__).to.have.own.property('validateString');
		expect(model.__proto__).to.have.own.property('validateInteger');
		expect(model.__proto__).to.have.own.property('validateEnum');
		expect(model.__proto__).to.have.own.property('validateJson');
	})

	describe('#validateJson', function() {
		it('should be valid', function() {
			model.validateString('validString', json.validString);
			
		})
		it('should throw ModelValidationError ', function() {
			function fn(){	
				model.validateString('invalidString', json.invalidString);
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should not throw ModelValidationError ', function() {
			function fn(){	
				model.validateString('validString', json.validString);
			}
			expect(fn).to.not.throw(ModelValidationError)
		})
	})

	describe('#validateInteger', function() {
		it('should be valid', function() {
			model.validateInteger('validInt', json.validInt);
			
		})
		it('should throw ModelValidationError ', function() {
			function fn(){	
				model.validateInteger('validInt', json.invalidInt);
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should not throw ModelValidationError ', function() {
			function fn(){	
				model.validateInteger('validInt', json.validInt);
			}
			expect(fn).to.not.throw(ModelValidationError)
		})
	})

	describe('#validateEnum', function() {
		
		let enums = ['one','two','three'];

		it('should be valid', function() {
			model.validateEnum('validEnum', json.validEnum, enums);
		})
		it('should throw ModelValidationError ', function() {
			function fn(){	
				model.validateEnum('invalidEnum', json.invalidEnum, enums);
			}
			expect(fn).to.throw(ModelValidationError)
		})
		it('should not throw ModelValidationError ', function() {
			function fn(){	
				model.validateEnum('validEnum', json.validEnum, enums);
			}
			expect(fn).to.not.throw(ModelValidationError)
		})
	})

	describe('#validateJson', function() {
		
		var requiredAttrs = ['validString', 'validInt', 'validEnum'];

		it('should be valid', function() {
			model.validateJson(requiredAttrs, json);
		})
		it('should not throw ModelValidationError ', function() {
			function fn(){	
				model.validateJson(requiredAttrs, json);
			}
			expect(fn).to.not.throw(ModelValidationError)
		})
		it('should throw ModelValidationError ', function() {
			function fn(){	
				requiredAttrs = ['missing', 'another_missing'];
				model.validateJson(requiredAttrs, json);
			}
			expect(fn).to.throw(ModelValidationError)
		})
	})
	
})