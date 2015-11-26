
/**
 * Module dependencies
 */

var test = require('tape');
var fs = require('fs');
var path = require('path');

var network = require('../../lib/network');
var CidrGrepStream = require('../../lib');

var logpath = path.join(__dirname, './access.log');


test('cidr-grep-stream should throw if no networks are passed', function(t) {

  t.throws(function() {
    var cidrGrepStream = CidrGrepStream();
  });

  t.end();

});


test('cidr-grep-stream should throw if invalid networks are passed', function(t) {

  t.throws(function() {
    var cidrGrepStream = CidrGrepStream({ networks: 123 });
  });

  t.end();

});


test('cidr-grep-stream should filter lines by a single network', function(t) {

  var output = [];
  var expected = [
    '192.168.1.15 - - [23/Oct/2015:15:33:09 +0200] "POST /test HTTP/1.1" 200 255 "-" "node-superagent/1.4.0"',
    '192.168.1.35 - - [23/Oct/2015:15:33:19 +0200] "POST /test HTTP/1.1" 200 248 "-" "Java/1.6.0_26"'
  ];

  fs.createReadStream(logpath)
    .pipe(CidrGrepStream({ networks: network.create('192.168.1.0/26') }))
    .on('data', function(data) {
      output.push(data);
    })
    .on('end', function() {
      t.deepEqual(output, expected);
      t.end();
    });

});


test('cidr-grep-stream should filter lines passing an array of networks', function(t) {

  var networks = [
    network.create('192.168.1.0/27'),
    network.create('192.168.1.64/27')
  ];

  var output = [];
  var expected = [
    '192.168.1.15 - - [23/Oct/2015:15:33:09 +0200] "POST /test HTTP/1.1" 200 255 "-" "node-superagent/1.4.0"',
    '192.168.1.70 - - [23/Oct/2015:15:33:19 +0200] "POST /test HTTP/1.1" 200 247 "-" "Java/1.6.0_26"'
  ];

  fs.createReadStream(logpath)
    .pipe(CidrGrepStream({ networks: networks }))
    .on('data', function(data) {
      output.push(data);
    })
    .on('end', function() {
      t.deepEqual(output, expected);
      t.end();
    });

});
