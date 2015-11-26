
/**
 * Module dependencies
 */

var through = require('through2');
var EOL = require('os').EOL;


/**
 * Transform stream.
 * Take a buffer and outputs every single lines as a chunk
 *
 * @param  {object} options
 */

module.exports = function(options) {

  options = options || {};

  return through.obj(function(chunk, enc, callback) {

    var self = this;
    var lines = chunk.toString().split(/\r\n|\r|\n/g);

    if (lines.length === 0) return callback();

    lines.forEach(function(line) {
      var data = options.appendEOL ? line + EOL : line;
      self.push(data);
    });

    callback();

  });

};
