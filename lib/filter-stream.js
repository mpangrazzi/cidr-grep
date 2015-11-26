
/**
 * Module dependencies
 */

var debug = require('debug')('cidr-grep:filter-stream');
var through = require('through2');
var REGEXP = require('./regexp');


/**
 * Transform stream factory.
 * Used as an IPv4 filter
 *
 * @param  {array} networks
 * @param  {function} callback
 * @return {object} stream
 */

module.exports = function(networks) {

  return through.obj(function(chunk, enc, callback) {

    var self = this, data = chunk.toString();
    var matches = data.match(REGEXP.IPv4);

    // no match

    if (!matches) return callback();

    // check if IPv4 matches are contained
    // in one or more user-provided networks

    matches.forEach(function(match) {

      var res = networks.some(function(n) {

        if (n.contains(match)) {
          debug('%s is part of %s', match, n.cidr);
          return true;
        }

      });

      // match: push line

      if (res) self.push(chunk);

    });

    callback();

  });

};
