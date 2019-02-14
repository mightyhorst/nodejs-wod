'use strict';

/**
* IoC
**/
/*@todo import IoC from '@aedart/js-ioc';*/
// import { IoC } from '../ioc';
const IoC = require('../ioc').IoC;

/**
* Contracts + Models + Services
**/
import { DateRangeContract } from '../models/contracts/date-range.contract';
const elasticSearchService = IoC.make('service.elastic-search');


/**
* Error Codes 
**/
import { 
	HttpError,
	ConfigError,
	DatabaseError,
	ModelError,
	ModelNotFoundError,
	ModelValidationError
} from '../shared/Errors';


/**
*
* Search the user history 
* GET /history 
*
*/
export function SearchController(elasticSearchService){

	this.search = async function(req, res, next) {
		try{ 
			let dateRangeContract = new DateRangeContract(req.query.start, req.query.end);
			
			let hits = await elasticSearchService.searchLogins(dateRangeContract);
			res.json({data: hits});
		}
		catch(err){
			if (err instanceof ModelValidationError) {
				console.error('ModelValidationFoundError', err.message);
			}
			next(err);
		}
	  
	}
}

/**
* @hack @todo export the function directly as search for the swagger middleware 
* 
**/
export const searchCtrl = new SearchController(elasticSearchService);
export const search = searchCtrl.search;
