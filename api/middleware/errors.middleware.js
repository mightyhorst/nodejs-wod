import { HttpError, ValidationError, ZschemaValidationError } from '../shared/Errors';

/*
* @function 404 - not found handler 
*/
export function notFoundHandler(req, res) {
    res.status(404).json({err: 'not found', url: req.url, method: req.method});
}
/*
* @function error handling middleware 
*/
export function errorHandler(err, req, res, next) {

    try{
        let operationId = req.swagger.operation.operationId;
        err.operationId = operationId; 
    } catch(err){
        if(err instanceof TypeError){ 
            console.error('Swagger operation is missing: ', err.message);
        }
    }
    // console.error('middleware.errorHandler.err ---> ', {'err.failedValidation ':err.failedValidation , 'middleware.errorHandler.err.constructor.name':err.constructor.name, 'middleware.errorHandler.err':err.message, 'err instanceof HttpError': err instanceof HttpError});

    /**
    * Swagger Validation errors
    * @requires ZSchema 
    **/
    if(err.failedValidation ){
        let validationErr = new ZschemaValidationError(err);
        res.status(validationErr.code).json(validationErr);   
    }
    else if(err.message === 'Validation errors'){
        let validationErr = new ValidationError(err.message, err.errors.map(e => e.name).join('') );
            validationErr.errors = err.errors;
        res.status(validationErr.code).json(validationErr);
    }
    
    /**
    * Custom Error handling 
    **/
    else if(err instanceof HttpError){
    	res.status(err.code).json(err);
    }
    else if(err instanceof Error){
        res.status(500).json({message:err.message, stack: err.stack});
    }
    else{
        res.status(err.code).json(err);   
    }
}	
