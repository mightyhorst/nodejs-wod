'use strict';

const SwaggerExpress = require('swagger-express-mw');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./api/swagger/swagger.yaml');

/**
* Express
**/
const app = require('express')();
import { DatabaseError, ConfigError } from './api/shared/Errors'


const config = {
  appRoot: __dirname 
};

/**
* Env 
**/
const env = require('dotenv').config({ path: './.env'});
if (env.error) {
	console.error('env file not found', env.error.message);
}


/**
* Middleware
* • CORS
* • Error Handling 
**/
import { cors } from './api/middleware/cors.middleware'
import { notFoundHandler, errorHandler } from './api/middleware/errors.middleware'



/**
*
* Swagger Express Server
*
**/
SwaggerExpress.create(config, function(err, swaggerExpress) {
	if (err) { 
		throw err; 
	}
	app.use(cors);
	swaggerExpress.register(app);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.use(notFoundHandler);
	app.use(errorHandler);

	var port = process.env.PORT || 10010;
	app.listen(port);
});

module.exports = app; /* for testing */