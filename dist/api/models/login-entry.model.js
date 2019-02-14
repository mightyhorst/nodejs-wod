'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LoginEntry = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _model = require('../models/model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class LoginEntry - a unit of login analytics
**/
var LoginEntry = exports.LoginEntry = function (_Model) {
	(0, _inherits3.default)(LoginEntry, _Model);

	/**
 * Represents a strongly typed date range or throws validation error 
 * @constructor
 * @param {json} entryJson - login entry  
 * @throws {ModelValidationError} if not a valid json
 **/
	function LoginEntry(entryJson) {
		(0, _classCallCheck3.default)(this, LoginEntry);

		var _this = (0, _possibleConstructorReturn3.default)(this, (LoginEntry.__proto__ || Object.getPrototypeOf(LoginEntry)).call(this));

		_this.requiredAttrs = ['user', 'sitecode', 'timestamp'];

		/*@throws {ModelValidationError} - not valid json*/
		_this.validateJson(_this.requiredAttrs, entryJson);

		_this.user = entryJson.user;
		_this.sitecode = entryJson.sitecode;
		_this.timestamp = entryJson.timestamp;
		return _this;
	}

	/**
 * @returns {json} - user, sitecode, timestamp 
 **/


	(0, _createClass3.default)(LoginEntry, [{
		key: 'toJson',
		value: function toJson() {
			return {
				user: this.user,
				sitecode: this.sitecode,
				timestamp: this.timestamp
			};
		}
	}]);
	return LoginEntry;
}(_model.Model);