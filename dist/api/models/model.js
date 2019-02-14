'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Model = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Errors = require('../shared/Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = exports.Model = function () {
	function Model() {
		(0, _classCallCheck3.default)(this, Model);
	}

	/**
 *
 * Validation
 *
 **/


	(0, _createClass3.default)(Model, [{
		key: 'validateJson',
		value: function validateJson(attrs, json) {
			var keys = Object.keys(json);
			attrs.forEach(function (attr) {
				if (!json.hasOwnProperty(attr)) throw new _Errors.ModelValidationError(attr + ' is required and not found in ' + keys);
			});
		}
	}, {
		key: 'validateInteger',
		value: function validateInteger(key, val) {
			if (isNaN(val)) throw new _Errors.ModelValidationError(key + ' is not a number');
		}
	}, {
		key: 'validateString',
		value: function validateString(key, val, greaterThan) {
			greaterThan = greaterThan ? greaterThan : 1;

			if (typeof val !== 'string') throw new _Errors.ModelValidationError(key + ' must be a string ');else if (val.length < greaterThan) throw new _Errors.ModelValidationError(key + ' length must be greater than ' + greaterThan);
		}
	}, {
		key: 'validateEnum',
		value: function validateEnum(key, val, list) {
			var isValid = list.find(function (cat) {
				return val.toLowerCase() === cat.toLowerCase();
			});

			if (isValid === undefined) throw new _Errors.ModelValidationError(key + ' of ' + val + ' must be of the following values: ' + list.join(","));
		}
	}, {
		key: 'validateDate',
		value: function validateDate(key, val) {
			val = new Date(val);
			if (val.toString() === 'Invalid Date') throw new _Errors.ModelValidationError(key + ' is not a valid date sorry');
		}
	}]);
	return Model;
}();