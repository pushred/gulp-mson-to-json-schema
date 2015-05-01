# [gulp](http://gulpjs.com)-mson-to-json-schema

 - Parse [MSON Data Structures][mson] with [protagonist][protagonist]
 - Generate [JSON Schema][json-schema] from the resulting AST
 - Enjoy describing your schema in Markdown!

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
var msonToJSONSchema = require('gulp-markdown-to-json-schema');

gulp.task('schema', function(){
  return gulp.src('./schema/**/*.md')
    .pipe(msonToJSONSchema())
    .pipe(gulp.dest('./schema/json'));
});
```

----
**[MIT](LICENSE) LICENSE** <br>
copyright &copy; 2015 Push the Red Button.


[mson]: https://github.com/apiaryio/mson
[protagonist]: https://www.npmjs.com/package/protagonist
[json-schema]: http:/json-schema.org
