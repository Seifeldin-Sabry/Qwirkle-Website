"use strict";

import {createRequire} from "node:module";

const hash256jarEl = document.getElementById('sha256jar');
const hash512jarEl = document.getElementById('sha512jar');
const hashMdn5jarEl = document.getElementById('md5jar');

const hash256zipEl = document.getElementById('sha256zip');
const hash512zipEl = document.getElementById('sha512zip');
const hashMdn5zipEl = document.getElementById('md5zip');

const require = createRequire(import.meta.url);
const hashJar = require("./hashjar.json")
const hashZip = require("./hashjar.json")
let {sha256 : sha256Jar,sha512 : sha512Jar,md5 : md5Jar} = hashJar
let {sha256 : sha256Zip,sha512 : sha512Zip,md5 : md5Zip} = hashZip

hash256jarEl.textContent = sha256Jar;
hash512jarEl.textContent = sha512Jar;
hashMdn5jarEl.textContent = md5Jar;

hash256zipEl.textContent = sha256Zip;
hash512zipEl.textContent = sha512Zip;
hashMdn5zipEl.textContent = md5Zip;

