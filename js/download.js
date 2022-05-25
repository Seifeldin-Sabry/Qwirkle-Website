"use strict";

import {hashjar} from "./hashjar.js";
import {hashzip} from "./hashzip.js";

const hash256jarEl = document.getElementById('sha256jar');
const hash512jarEl = document.getElementById('sha512jar');
const hashMdn5jarEl = document.getElementById('md5jar');

const hash256zipEl = document.getElementById('sha256zip');
const hash512zipEl = document.getElementById('sha512zip');
const hashMdn5zipEl = document.getElementById('md5zip');


let {sha256: sha256Jar, sha512: sha512Jar, md5: md5Jar} = hashjar
let {sha256: sha256Zip, sha512: sha512Zip, md5: md5Zip} = hashzip

sha256Jar = sha256Jar.split(" ")[0];
sha512Jar = sha512Jar.split(" ")[0];
md5Jar = md5Jar.split(" ")[0];

sha256Zip = sha256Zip.split(" ")[0];
sha512Zip = sha512Zip.split(" ")[0];
md5Zip = md5Zip.split(" ")[0];


hash256jarEl.textContent = sha256Jar;
hash512jarEl.textContent = sha512Jar;
hashMdn5jarEl.textContent = md5Jar;

hash256zipEl.textContent = sha256Zip;
hash512zipEl.textContent = sha512Zip;
hashMdn5zipEl.textContent = md5Zip;

