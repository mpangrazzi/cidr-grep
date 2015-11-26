
/**
 * Module dependencies
 */

var objectAssign = require('object-assign');
var ip = require('ip');


/**
 * Factory
 *
 * @param  {string} Network in CIDR notation
 * @return {object}
 * @public
 */

exports.create = function(cidr) {

  var n = objectAssign(Object.create(network), ip.cidrSubnet(cidr));

  n.cidr = cidr;
  n.firstAddressLong = ip.toLong(n.firstAddress);
  n.lastAddressLong = ip.toLong(n.lastAddress);

  return n;

};


/**
 * Network
 *
 * @type {Object}
 */

var network = {

  /**
   * Check if `ip` is part of this network
   *
   * @param  {string} ip
   * @return {boolean}
   */

  contains: function(IPv4) {

    var long = ip.toLong(IPv4);
    return long >= this.firstAddressLong && long <= this.lastAddressLong;

  }

};
