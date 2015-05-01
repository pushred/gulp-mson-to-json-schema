const PLUGIN = 'mson-to-json-schema';

var inspect = require('util').inspect;
var gutil = require('gulp-util');
var Path = require('path');
var protagonist = require('protagonist');
var through = require('through2');
var transform = require('lodash.transform');

function generateSchema (mson, filename) {
  if (!mson.ast.content.length) {
    console.error(new gutil.PluginError(PLUGIN, filename + ' is not valid MSON').toString());
    return;
  }

  mson = mson.ast.content && mson.ast.content[0].content[0];

  var schema = {
    $schema: "http://json-schema.org/draft-04/schema#",
    title: mson.name.literal,
    properties: {},
    type: mson.typeDefinition.typeSpecification.name
  };

  mson.sections[0].content.forEach(function (msonProperty) {
    msonProperty = msonProperty.content;

    var property = transform({
      type: msonProperty.valueDefinition.typeDefinition.typeSpecification.name,
      example: msonProperty.valueDefinition.values[0].literal,
      description: msonProperty.description
    }, function (obj, val, key) {
      if (val) obj[key] = val;
    });

    schema.properties[msonProperty.name.literal] = property;
  });

  return schema;
};

module.exports = function() {

  var stream = through.obj(function (input, encoding, callback) {
    if (input.stat.isDirectory()) return;

    var self = this;
    var filename = Path.basename(input.path);
    var mson = input.contents.toString();
    if (!mson.length) return;

    protagonist.parse(mson, function (err, result) {
      if (err) {
        console.error(new gutil.PluginError(err).toString());
        callback();
      };

      var schema = generateSchema(result, filename);
      if (!schema) return;

      var file = new gutil.File({
        base: '/',
        cwd: '/',
        path: '/' + filename.replace('.md', '.json'),
        contents: new Buffer(schema)
      });

      self.push(file);
      callback();
    });
  });

  return stream;
};
