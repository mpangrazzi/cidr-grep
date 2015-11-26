
/**
 * Module dependencies
 */

var pipe = require('multipipe');
var Network = require('./network');
var LineStream = require('../lib/line-stream');
var FilterStream = require('../lib/filter-stream');


module.exports = function(options) {

  options = options || {};

  if (!options.networks) {
    throw new Error('option `networks` is required');
  }

  if (!Array.isArray(options.networks)) {
    options.networks = [options.networks];
  }

  var networks = options.networks.map(function(i) {

    if (typeof i === 'object' && i.cidr) return i;

    var network = null;

    try {
      network = Network.create(i);
    } catch(e) {
      throw e;
    }

    return network;

  });

  return pipe(
    LineStream({ appendEOL: options.appendEOL }),
    FilterStream(networks)
  );

};
