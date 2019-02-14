process.env.ELASTICSEARCH_INDEX = 'wod';

/**
* Imports 
**/
import { LoginEntry } from '../models/login-entry.model';
import { DateRangeContract } from '../models/contracts/date-range.contract';


/**
* @class ElasticSearchService - service to query elatic search 
* @requires LoginEntry
* @requires DateRangeContract
**/
export class ElasticSearchService{

    /**
     * Connect to the client 
	 * @param {Client} client
	 */
    constructor(client){
        this.client = client;
    }

    /**
    * Check
    * @return {Promise<boolean,string>}
    **/
    check(){
        return new Promise((done, fail)=>{
            this.client.ping({
                requestTimeout: 30000,
            }, (error)=> {
                if (error) {
                    console.error('elasticsearch cluster is down!', {err:error});
                    fail(false);//('elasticsearch cluster is down!', {err:error});
                } else {
                    console.log('All is well');
                    done(true);
                }
            });
        })
    }

    /**
    * Search Login Entries 
    * @params {DateRangeContract} dateRangeContract 
    * @return {Promise<results>} hits - results from the query 
    * @throws {TypeError} not a {DateRangeContract} 
    * @throws {ModelValidationError} not valid {LoginEntry}
    **/
    searchLogins(dateRangeContract){

        if(dateRangeContract.constructor.name !== 'DateRangeContract') throw new TypeError('expected a DateRangeContract');
        
	    return this.client.search({
	            index: process.env.ELASTICSEARCH_INDEX,
	            body: dateRangeContract.toElasticSearchQuery()
	        })
	        .then(resp => {
	        	/*@todo logger*/
	            return resp.hits.hits.map(hit => hit._source )
	        })
	        .then(hits =>{
	        	/*@todo logger*/
	            return hits.map(hit => new LoginEntry(hit));
	        })
	        .then(logins =>{
	        	/*@todo logger*/
	            return logins.map(login => login.toJson());
	        })
	        .catch(err => {
	             console.trace(err.message);
	        });
    }
}

// export const elasticSearchSingleton = new ElasticSearchService();