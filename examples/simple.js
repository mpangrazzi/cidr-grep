
/**
 * Module dependencies
 */

var CidrGrepStream = require('../lib');
var fs = require('fs');
var path = require('path');

var logpath = path.join(__dirname, '../fixtures/apache-access.log');


fs.createReadStream(logpath)
  .pipe(CidrGrepStream({ networks: '192.168.1.1/24', appendEOL: true }))
  .pipe(process.stdout);
