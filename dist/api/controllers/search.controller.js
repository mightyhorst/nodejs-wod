'use strict';

/**
* IoC
**/
/*@todo import IoC from '@aedart/js-ioc';*/
// import { IoC } from '../ioc';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.search = exports.searchCtrl = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.SearchController = SearchController;

var _dateRange = require('../models/contracts/date-range.contract');

var _Errors = require('../shared/Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IoC = require('../ioc').IoC;

/**
* Contracts + Models + Services
**/

var elasticSearchService = IoC.make('service.elastic-search');

/**
* Error Codes 
**/


/**
*
* Search the user history 
* GET /history 
*
*/
function SearchController(elasticSearchService) {

	this.search = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
			var dateRangeContract, hits;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							dateRangeContract = new _dateRange.DateRangeContract(req.query.start, req.query.end);
							_context.next = 4;
							return elasticSearchService.searchLogins(dateRangeContract);

						case 4:
							hits = _context.sent;

							res.json({ data: hits });
							_context.next = 12;
							break;

						case 8:
							_context.prev = 8;
							_context.t0 = _context['catch'](0);

							if (_context.t0 instanceof _Errors.ModelValidationError) {
								console.error('ModelValidationFoundError', _context.t0.message);
							}
							next(_context.t0);

						case 12:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this, [[0, 8]]);
		}));

		return function (_x, _x2, _x3) {
			return _ref.apply(this, arguments);
		};
	}();
}

/**
* @hack @todo export the function directly as search for the swagger middleware 
* 
**/
var searchCtrl = exports.searchCtrl = new SearchController(elasticSearchService);
var search = exports.search = searchCtrl.search;