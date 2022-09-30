'use strict';

const pagination = require('../lib/index.esm');
const assert = require('assert').strict;

assert.strictEqual(pagination(), 'Hello from pagination');
console.info("pagination tests passed");
