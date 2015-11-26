
/**
 * Module dependencies
 */

var test = require('tape');
var Readable = require('stream').Readable;
var LineStream = require('../../lib/line-stream');

// input string

var data = 'I\'m the first line\r\nand I\'m the second line\n';

// input stream

var input = new Readable();
input.push(data);
input.push(null);

// expected stream output

var expected = [
  'I\'m the first line',
  'and I\'m the second line'
];


test('Line-stream should emit data events every line breaks', function (t) {

  var result = [];

  input
    .pipe(LineStream())
    .on('data', function(chunk) {
      result.push(chunk.toString());
    })
    .on('end', function() {
      t.equal(result[0], expected[0], 'First line');
      t.equal(result[1], expected[1], 'Second line');
      t.end();
    });

});
