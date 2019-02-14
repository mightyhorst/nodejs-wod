import { 
	ModelError,
	ModelValidationError,
	ModelNotFoundError,
	DatabaseError
} from '../shared/Errors';

export class Model{

	constructor(){}

	/**
	*
	* Validation
	*
	**/
	validateJson(attrs, json){
		var keys = Object.keys(json);
		attrs.forEach(attr => {
			if(!json.hasOwnProperty(attr))
				throw new ModelValidationError(`${attr} is required and not found in ${keys}`);
		})
	}

	validateInteger(key, val){
		if(isNaN(val))
			throw new ModelValidationError(`${key} is not a number`);
	}

	validateString(key, val, greaterThan){
		greaterThan = greaterThan ? greaterThan : 1;

		if(typeof(val) !== 'string')
			throw new ModelValidationError(`${key} must be a string `);
		else if(val.length < greaterThan)
			throw new ModelValidationError(`${key} length must be greater than ${greaterThan}`);
	}

	validateEnum(key, val, list){
		let isValid = list.find(cat => {
			return val.toLowerCase() === cat.toLowerCase();
		})

		if(isValid === undefined)
			throw new ModelValidationError(`${key} of ${val} must be of the following values: ${list.join(",")}`);
	}

	validateDate(key, val){
		val = new Date(val);
		if(val.toString() === 'Invalid Date')
			throw new ModelValidationError(`${key} is not a valid date sorry`);
	}
	
}