import { Model } from '../model';

export class DateRangeContract extends Model{

    /**
    * Represents a strongly typed date range or throws validation error 
    * @constructor
    * @param {string} startDate - converted to Date or throws validation error 
    * @param {string} endDate - converted to Date or throws validation error 
    * @throws {ModelValidationError} if not a valid date 
    **/ 
    constructor(startDate, endDate){
        super();
        this.validateDate('startDate', startDate);
        this.validateDate('endDate', endDate);

        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }

    /**
    * toElasticSearchQuery
    * @returns {json} query
    **/
    toElasticSearchQuery(){
        return {
            'query': {
                'range' : {
                    'timestamp' : {
                        'gte' : this.startDate.toISOString(),
                        'lte' : this.endDate.toISOString()
                    }
                }
            }
        }
    }
}