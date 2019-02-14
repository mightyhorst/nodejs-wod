const chai = require('chai')
const expect = chai.expect;
const sinon  = require('sinon');

/**
* Imports
**/
import { 
	HttpError,
	ConfigError,
	DatabaseError,
	ValidationError,
	ZschemaValidationError,
	ModelError,
	ModelNotFoundError,
	ModelValidationError 
} from '../../../api/shared/Errors';
import { errorHandler } from '../../../api/middleware/errors.middleware';

/**
* Fakes
**/
import { Response, req } from '../../../mock/express';
const res = new Response();
const next = {};

describe('errorHandler', function() {

	describe('#errorHandler', function() {

		it('should be a function', function() {
			expect(typeof(errorHandler)).to.equal('function');
		});

		it('should accept four arguments', function() {
			expect(errorHandler.length).to.equal(4);
		});

	})

	describe('#ValidationError - Swagger validation errors', function() {
		it('should throw a ZschemaValidationError', function() {
			
			let zschemaError = new Error()
			zschemaError.failedValidation = true;
			zschemaError.paramName = 'paramName'
			zschemaError.results = {
				errors: [
					{
						message: 'message'
					}
				]
			}
			
			
			errorHandler(zschemaError, req, res, next)


			let validationErr = new ZschemaValidationError(zschemaError);

			expect(res.debug()).to.deep.equal({
				type: "validation",
				code: validationErr.code,
				key: "paramName",
				message: validationErr.message
			})
			
		})
		it('should throw a ValidationError', function() {
			
			let err = new Error();
			err.message = 'Validation errors'
			
		})
	})

	const message = 'message'; 
	const key = 'key';

	describe('#HttpError - and extentions', function() {
		describe('#ConfigError', function() {
			it('should ', function() {
			
				let err = new ConfigError(message);

				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 511,
					type: 'config',
					key: 'config.not.found',
					message: message
				})
				
			})
		})
		describe('#DatabaseError', function() {
			it('should return a databse error', function() {
			
				let err = new DatabaseError(message);
				
				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 512,
					type: 'database',
					message: message
				})
			})
		})
		describe('#ValidationError', function() {
			it('should return a validation error ', function() {
			
				let err = new ValidationError(message);
				
				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 422,
					type: 'validation',
					message: message
				})

			})
		})
		describe('#ModelError', function() {
			it('should return a model error', function() {
			
				let err = new ModelError(message);
				
				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 513,
					type: 'model',
					key: 'model.not.found',
					message: message
				})
			})
		})
		describe('#ModelNotFoundError', function() {
			it('should return a ModelNotFoundError', function() {

				let err = new ModelNotFoundError(message);
				
				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 513,
					type: 'model',
					key: 'model.not.found',
					message: message
				})
			})
		})
		describe('#ModelValidationError', function() {
			it('should return a ModelValidationError', function() {

				let err = new ModelValidationError(message);
				
				errorHandler(err, req, res, next)

				expect(res.debug()).to.deep.equal({
					code: 513,
					type: 'model',
					key: 'model.validation',
					message: message
				})

			})
		})
	})

	describe('#Error - not a HttpError', function() {
		it('should return a generic Error', function() {
			
			let err;

			try{ 
				err = new Error(message); 
			}catch(err){
				
			}
			
			errorHandler(err, req, res, next)

			expect(res.debug()).to.deep.equal({
				code: 500,
				message: message
			})

		})
	})
	
})