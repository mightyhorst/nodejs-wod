import { Model } from '../models/model';
/**
* @class LoginEntry - a unit of login analytics
**/
export class LoginEntry extends Model{
	/**
	* Represents a strongly typed date range or throws validation error 
	* @constructor
	* @param {json} entryJson - login entry  
	* @throws {ModelValidationError} if not a valid json
	**/ 
	constructor(entryJson){
		super();
		
		this.requiredAttrs = ['user', 'sitecode', 'timestamp'];

		/*@throws {ModelValidationError} - not valid json*/
		this.validateJson(this.requiredAttrs, entryJson);
		
		this.user = entryJson.user;
		this.sitecode = entryJson.sitecode;
		this.timestamp = entryJson.timestamp;
	}

	/**
	* @returns {json} - user, sitecode, timestamp 
	**/
	toJson(){
		return {
			user: this.user,
			sitecode: this.sitecode,
			timestamp: this.timestamp
		}
	}
}