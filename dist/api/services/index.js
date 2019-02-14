'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elasticSearch = require('./elastic-search.service');

Object.keys(_elasticSearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _elasticSearch[key];
    }
  });
});