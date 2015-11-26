cidr-grep
=========

A `grep`-like tool used to filter IP addresses against one or more [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) network patterns.

I wanted a tool which I can use both as a CLI tool and a Node.js [transorm stream](https://nodejs.org/api/stream.html). So I've built cidr-grep, for easily doing things like that:

`$ cat access.log | cidrgrep -n 192.168.1.0/27`

or

`$ tail -f access.log | cidrgrep -n 192.168.1.0/27`

Where `access.log` can be, for example, an [Apache](https://httpd.apache.org), [Nginx](http://nginx.org) or [Squid](http://www.squid-cache.org) server access log.


### Install

With [npm](https://www.npmjs.com):

```
npm install cidr-grep
```

If you want to use it as a CLI tool, install globally with:

```
npm install cidr-grep -g
```


### Usage as a CLI tool

You can do that in two ways:

```bash

# Using it directly

$ cidrgrep -f ./fixtures/squid-access.log -f ./fixtures/apache-access.log -n 192.168.1.0/24 -n 192.168.10.0/24

# Using it with Unix pipe

$ cat fixtures/apache-access.log | cidrgrep -n 192.168.1.0/27
```

### Usage as a Node.js stream

```js
/**
 * Module dependencies
 */

var CidrGrepStream = require('cidr-grep');
var fs = require('fs');


fs.createReadStream(__dirname + '/fixtures/apache-access.log')
  .pipe(CidrGrepStream({ networks: '192.168.1.1/24', appendEOL: true }))
  .pipe(process.stdout);
```


### Documentation

```js
var cidrGrepStream = CidrGrepStream( /* options */ );
```

Available `options` are:

- `networks`: _String|Array_. **Required**. A network pattern written using CIDR notation, e.g.: `192.168.1.0/24` or `10.10.0.0/16`.

- `appendEOL`: _Boolean_. Append an [os.EOL](https://nodejs.org/api/os.html#os_os_eol) char after each stream chunks. It's used by default in CLI mode.
