'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DateRangeContract = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _model = require('../model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRangeContract = exports.DateRangeContract = function (_Model) {
    (0, _inherits3.default)(DateRangeContract, _Model);

    /**
    * Represents a strongly typed date range or throws validation error 
    * @constructor
    * @param {string} startDate - converted to Date or throws validation error 
    * @param {string} endDate - converted to Date or throws validation error 
    * @throws {ModelValidationError} if not a valid date 
    **/
    function DateRangeContract(startDate, endDate) {
        (0, _classCallCheck3.default)(this, DateRangeContract);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangeContract.__proto__ || Object.getPrototypeOf(DateRangeContract)).call(this));

        _this.validateDate('startDate', startDate);
        _this.validateDate('endDate', endDate);

        _this.startDate = new Date(startDate);
        _this.endDate = new Date(endDate);
        return _this;
    }

    /**
    * toElasticSearchQuery
    * @returns {json} query
    **/


    (0, _createClass3.default)(DateRangeContract, [{
        key: 'toElasticSearchQuery',
        value: function toElasticSearchQuery() {
            return {
                'query': {
                    'range': {
                        'timestamp': {
                            'gte': this.startDate.toISOString(),
                            'lte': this.endDate.toISOString()
                        }
                    }
                }
            };
        }
    }]);
    return DateRangeContract;
}(_model.Model);