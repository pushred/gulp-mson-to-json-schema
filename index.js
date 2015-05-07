const PLUGIN = 'gulp-mson-to-json-schema';

var boutique = require('boutique');
var gutil = require('gulp-util');
var objectPath = require('object-path').get;
var Path = require('path');
var protagonist = require('protagonist');
var through = require('through2');

function getDataStructures (ast) {
  var matches = [];

  ast.content.forEach(function (section) {
    if (section.element !== 'category') return;

    section.content.forEach(function (element) {
      if (element.element !== 'dataStructure') return;
      matches.push(element);
    });
  });

  return matches;
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
        console.error(new gutil.PluginError(PLUGIN, err).toString());
        callback();
      };

      result.warnings.forEach(function (warning) {
        console.error(new gutil.PluginError(PLUGIN, warning).toString());
      });

      getDataStructures(result.ast).forEach(function (ast) {
        var schema = boutique.represent({ ast: ast, contentType: 'application/schema+json' }, function (err, body) {
          if (err) console.error(new gutil.PluginError(PLUGIN, err).toString());

          self.push(new gutil.File({
            base: '/',
            cwd: '/',
            path: '/' + ast.name.literal + '.json',
            contents: new Buffer(body)
          }));
        });
      });

      callback();
    });
  });

  return stream;
};
