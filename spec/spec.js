'use strict';

const fs = require('fs');
const es = require('event-stream');
const File = require('vinyl');
const gulpBolt = require('../');
const gutil = require('gulp-util');
const stream = require('stream');

const FIXTURE_PATH = `${__dirname}/fixtures`;

function jsonBufferFor(fixtureName) {
  let path = `${FIXTURE_PATH}/${fixtureName}.json`;
  return fs.readFileSync(path);
}

function boltFileFor(fixtureName) {
  let path = `${FIXTURE_PATH}/${fixtureName}.bolt`;
  let buffer = fs.readFileSync(path);
  return new File({ path: path, contents: buffer });
}

describe('gulp-firebase-bolt', () => {
  it('works in buffered mode', (done) => {
    let boltFile = boltFileFor('userdoc');
    let jsonBuffer = jsonBufferFor('userdoc');

    let gulpBoltStream = gulpBolt();

    gulpBoltStream.on('data', file => {
      expect(file.contents).toEqual(jsonBuffer);
      done();
    });
    gulpBoltStream.on('end', done);

    gulpBoltStream.write(boltFile);
    gulpBoltStream.end;
  });

  it('does not support stream mode', (done) => {
    let gulpBoltStream = gulpBolt();
    let fakeStream = new stream.PassThrough();
    let fakeFile = new gutil.File({ contents: fakeStream });

    expect(() => {
      gulpBoltStream.write(fakeFile, done);
    }).toThrow(new Error('Streaming not supported'));
  });

  it('should let null files pass through', function(done) {
    let gulpBoltStream = gulpBolt();
    let n = 0;

    gulpBoltStream.pipe(es.through((file) => {
      expect(file.path).toEqual('null.bolt');
      expect(file.contents).toEqual(null);
      n++;
    }, () => {
      expect(n).toEqual(n, 1);
      done();
    }));

    gulpBoltStream.write(new gutil.File({
      path: 'null.bolt',
      contents: null
    }));

    gulpBoltStream.end();
  });

  it('fails with an invalid bolt', (done) => {
    let boltFile = boltFileFor('invalid');
    let gb = gulpBolt();

    gb.on('error', (err) => {
      expect(err.message).toBeDefined();
      done();
    });

    gb.write(boltFile);
  });
});
