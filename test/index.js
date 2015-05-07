var assert = require('assert');
var Lab = require('lab');
var MSONtoJSON = require('../index');
var vfs = require('vinyl-fs');

var lab = exports.lab = Lab.script();

lab.experiment('API Blueprints', function(){

  lab.test('with a single data structure', function (done) {
    vfs.src(__dirname + '/fixtures/single.md')
      .pipe(MSONtoJSON())
      .on('data', function (file) {
        var schema = JSON.parse(file.contents.toString('utf8'));
        assert.equal(file.path.split('/').pop(), 'product.json');
        assert.equal(schema['$schema'], 'http://json-schema.org/draft-04/schema#');
        assert.equal(schema.properties.name.description, 'Short description of the product');
      })
      .on('finish', done);
  });

  lab.test('with multiple data structures', function (done) {
    var files = [];

    vfs.src(__dirname + '/fixtures/multiple.md')
      .pipe(MSONtoJSON())
      .on('data', function (file) {
        files.push(file);
      })
      .on('finish', function(){
        assert.equal(files.length, 2);

        var photo = files.filter(function (file) {
          return file.path === '/photo.json';
        })[0];

        var schema = JSON.parse(photo.contents.toString('utf8'));
        assert.equal(schema.properties.caption.description, 'Caption describing the photo');

        done();
      });
  });

});
