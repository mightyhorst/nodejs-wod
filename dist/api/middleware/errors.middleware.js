'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;

var _Errors = require('../shared/Errors');

/*
* @function 404 - not found handler 
*/
function notFoundHandler(req, res) {
    res.status(404).json({ err: 'not found', url: req.url, method: req.method });
}
/*
* @function error handling middleware 
*/
function errorHandler(err, req, res, next) {

    try {
        var operationId = req.swagger.operation.operationId;
        err.operationId = operationId;
    } catch (err) {
        if (err instanceof TypeError) {
            console.error('Swagger operation is missing: ', err.message);
        }
    }
    // console.error('middleware.errorHandler.err ---> ', {'err.failedValidation ':err.failedValidation , 'middleware.errorHandler.err.constructor.name':err.constructor.name, 'middleware.errorHandler.err':err.message, 'err instanceof HttpError': err instanceof HttpError});

    /**
    * Swagger Validation errors
    * @requires ZSchema 
    **/
    if (err.failedValidation) {
        var validationErr = new _Errors.ZschemaValidationError(err);
        res.status(validationErr.code).json(validationErr);
    } else if (err.message === 'Validation errors') {
        var _validationErr = new _Errors.ValidationError(err.message, err.errors.map(function (e) {
            return e.name;
        }).join(''));
        _validationErr.errors = err.errors;
        res.status(_validationErr.code).json(_validationErr);
    }

    /**
    * Custom Error handling 
    **/
    else if (err instanceof _Errors.HttpError) {
            res.status(err.code).json(err);
        } else if (err instanceof Error) {
            res.status(500).json({ message: err.message, stack: err.stack });
        } else {
            res.status(err.code).json(err);
        }
}