# [gulp](http://gulpjs.com)-mson-to-json-schema

 - Pipe in [API Blueprint][api-blueprint] files with [Data Structures][data-structures]
 - Parse the [MSON][mson] with [protagonist][protagonist]
 - Convert to [JSON Schema draft v4][json-schema] from the resulting AST with [boutique][boutique]
 - Enjoy designing your schema in Markdown!


install
-------

```sh
$ npm install gulp-mson-to-json --save-dev
```


pipe
----

**`/gulpfile.js`**

```bash
var gulp = require('gulp');
var MSONtoJSON = require('gulp-markdown-to-json-schema');

gulp.task('schema', function(){
  return gulp.src('./schema/**/*.md')
    .pipe(msonToJSONSchema())
    .pipe(gulp.dest('./schema/json'));
});
```

JSON output comes from boutique as a string. Pipe in [gulp-beautify][gulp-beautify] for beautiful, readable files.

----
**[MIT](LICENSE) LICENSE** <br>
copyright &copy; 2015 Push the Red Button.


[api-blueprint]: https://apiblueprint.org
[boutique]: https://www.npmjs.com/package/boutique
[data-structures]: http://git.io/vUvAA
[json-schema]: http:/json-schema.org
[gulp-beautify]: https://www.npmjs.com/package/gulp-beautify
[mson]: https://github.com/apiaryio/mson
[protagonist]: https://www.npmjs.com/package/protagonist
