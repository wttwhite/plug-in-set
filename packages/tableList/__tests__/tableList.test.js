'use strict';

const tablelist = require('..');
const assert = require('assert').strict;

assert.strictEqual(tablelist(), 'Hello from tablelist');
console.info("tablelist tests passed");
