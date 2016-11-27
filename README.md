# gulp-firebase-bolt-compiler :fire:

[![Build Status](https://travis-ci.org/fny/gulp-firebase-bolt-compiler.svg?branch=master)](https://travis-ci.org/fny/gulp-firebase-bolt-compiler) [![npm version](https://badge.fury.io/js/gulp-firebase-bolt-compiler.svg)](http://badge.fury.io/js/gulp-firebase-bolt-compiler) [![Dependencies](https://david-dm.org/fny/gulp-firebase-bolt-compiler.svg)](https://david-dm.org/fny/gulp-firebase-bolt-compiler)

No frills Firebase Bolt plugin for Gulp that simply wraps Firebase's [Bolt](https://github.com/firebase/bolt) library.

Note that all releases, even v0.x, are stable. The version simply reflects the suppored Bolt compiler version (in this case any v0.y.)

## Install

    npm install gulp-firebase-bolt-compiler-compiler --save-dev

## Example

```javascript
'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const bolt = require('gulp-firebase-bolt-compiler');

const paths = {
  rules: [ 'rules/functions.bolt', 'rules/types/**/*.bolt', 'rules/paths.bolt' ]
};

gulp.task('bolt', function() {
  gulp.src(paths.bolt)
    .pipe(concat('rules.bolt'))
    .pipe(bolt())
    .pipe(gulp.dest('./build/'));
});
```

## Issues

Since `gulp-firebase-bolt-compiler` is a light-weight wrapper around [`firebase-bolt`](https://github.com/firebase/bolt), you're most likely having an issue with [`firebase-bolt`](https://github.com/firebase/bolt). Check [`firebase-bolt`'s issues](https://github.com/firebase/bolt/issues) and elsewhere about the internet before filing an issue here!
