'use strict';

var bolt = require('firebase-bolt');
var through2 = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-firebase-bolt';

/**
 * Translates rules from Bolt to JSON.
 *
 * @param  {String} boltString  Bolt string to compile into JSON rules
 * @return {String}             Compiled JSON rules
 */
function translateRules(boltString) {
  var symbols = bolt.parse(boltString);
  var generator = new bolt.Generator(symbols);
  var rules = generator.generateRules();
  return JSON.stringify(rules, null, 2);
}

module.exports = function() {
  return through2.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    var compiled = null;

    try {
      compiled = translateRules(file.contents.toString());
    }
    catch (err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
        fileName: file.path
      }));
      return callback();
    }

    file.contents = new Buffer(compiled);
    file.path = gutil.replaceExtension(file.path, '.json');
    this.push(file);

    callback(null, file);
  });
};
