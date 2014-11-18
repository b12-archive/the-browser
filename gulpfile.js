/*jshint node: true */




// Our build script
// =================================================================================================
// If you use gulp, you'll know your way around.
// If you don't, just run `npm run build` from your console to build the lot.


// Settings
// -------------------------------------------------------------------------------------------------
// All paths unix-style here, please.

var watchTasks =
    [ 'scripts'
    ];
var buildTasks = watchTasks.concat(
    [ 'minify'
    , 'manifest'
    ]);

var whereToLookFor =
    { scripts: 'src/the-browser.js'
    , manifest: {data: './package.json'}
    };
var howToPack =
    { scripts: 'the-browser.js'
    , manifest: 'bower.json'
    };
var whereToPut =
    { scripts: 'dist'
    , sourcemaps: 'sourcemaps' // Relative to and whereToPut.scripts
    , manifest: '.'
    };

var pathsToWatch = 'src/**/*';


// Imports
// -------------------------------------------------------------------------------------------------

var fs = require('fs');
var path = require('path');

var formatJSON = require('format-json');
var gulp = require('gulp');
var lazypipe = require('lazypipe');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');


// Utility functions
// -------------------------------------------------------------------------------------------------

var call = function (callback) { 'use strict';
        return function () {
            if (typeof callback == 'function') callback();
        };
    };




// Tasks
// =================================================================================================


// `gulp` or `gulp build`
// -------------------------------------------------------------------------------------------------
// Builds the lot. The setting `buildTasks` contains the list of tasks that are performed.

gulp.task('default', ['build']);
gulp.task('build', buildTasks);


// `gulp watch`
// -------------------------------------------------------------------------------------------------
// Watches files for changes – according to the setting `pathsToWatch` – and performs `watchTasks`
// on-the-fly as needed.

gulp.task('watch', watchTasks, function watch () { 'use strict';
    gulp.watch(pathsToWatch, watchTasks);
});


// `gulp scripts`
// -------------------------------------------------------------------------------------------------
// Builds JS scripts into a single file.

gulp.task('scripts', function scripts (done) { 'use strict';
    gulp.src(whereToLookFor.scripts)
        .pipe(sourcemaps.init())
            .pipe(concat(howToPack.scripts))
        .pipe(sourcemaps.write('sourcemaps'))
        .pipe(gulp.dest(whereToPut.scripts))
        .on('end', call(done))
        ;
});


// `gulp minify`
// -------------------------------------------------------------------------------------------------
// Minifies all built files.

gulp.task('minify', ['scripts'], function minify (done) { 'use strict';
    var addSuffix = lazypipe().pipe(rename, { suffix: ".min" });

    gulp.src(path.join(whereToPut.scripts, howToPack.scripts))
        .pipe(uglify())
        .pipe(addSuffix())
        .pipe(gulp.dest(whereToPut.scripts))
        .once('end', function () { done(); })
        ;
});


// `gulp manifest`
// -------------------------------------------------------------------------------------------------
// Renders _bower.json_, pulling data from _package.json_.

gulp.task('manifest', function manifest () { 'use strict';
    var rawData = require(whereToLookFor.manifest.data)
      , cookedData = {}
      , landingPath = path.join.apply
        ( null
        , whereToPut.manifest.split('/').concat(howToPack.manifest)
        )
      ;

    // Get data straight from package.json
    [ 'name'
    , 'version'
    , 'description'
    , 'main'
    , 'private'
    , 'repository'
    , 'copyright'
    , 'license'
    , { 'contributors': 'authors' }
    ].forEach(function (what) {
        var to, from;

        if (typeof what == 'string') {
            from = to = what;
        } else {
            from = Object.keys(what)[0];
            to = what[from];
        }

        if (rawData[from]) cookedData[to] = rawData[from];
    });

    // Get data from package.json/_bower
    if (rawData._bower) {
        Object.keys(rawData._bower).forEach(function (key) {
            cookedData[key] = rawData._bower[key];
        });
    }

    // Render the file
    fs.writeFileSync(landingPath, formatJSON.diffy(cookedData));
});
