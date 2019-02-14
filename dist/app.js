'use strict';

var _Errors = require('./api/shared/Errors');

var _cors = require('./api/middleware/cors.middleware');

var _errors = require('./api/middleware/errors.middleware');

var SwaggerExpress = require('swagger-express-mw');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('yamljs').load('./api/swagger/swagger.yaml');

/**
* Express
**/
var app = require('express')();


var config = {
	appRoot: __dirname
};

/**
* Env 
**/
var env = require('dotenv').config({ path: './.env' });
if (env.error) {
	console.error('env file not found', env.error.message);
}

/**
* Middleware
* • CORS
* • Error Handling 
**/


/**
*
* Swagger Express Server
*
**/
SwaggerExpress.create(config, function (err, swaggerExpress) {
	if (err) {
		throw err;
	}
	app.use(_cors.cors);
	swaggerExpress.register(app);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.use(_errors.notFoundHandler);
	app.use(_errors.errorHandler);

	var port = process.env.PORT || 10010;
	app.listen(port);
});

module.exports = app; /* for testing */