// Gulp plugins
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
//import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import rimraf from 'gulp-rimraf';
import stripCssComments from 'gulp-strip-css-comments';
import strip from 'gulp-strip-comments';
import browserSyncLib from 'browser-sync';

const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

// Paths
const paths = {
  styles: [
    'src/sass/vendor/**/*.css',
    'src/sass/**/*.css',
    'src/sass/**/*.scss'
  ],
  scripts: {
    js: [
      'src/js/vendor/**/*.js',
      'src/js/**/*.js'
    ]
  }
};

const jsDest = 'dist/js';
const cssDest = 'dist/css';

// Tasks

export const stylesClean = () =>
  gulp.src(cssDest).pipe(rimraf());

export const scriptsClean = () =>
  gulp.src(jsDest).pipe(rimraf());

export const styles = () =>
  gulp.src('src/sass/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({ noCache: true, outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(stripCssComments({ preserve: true }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest))
    .pipe(notify({ message: 'Styles built' }))
    .pipe(browserSync.stream());

export const scripts = () =>
  gulp.src(paths.scripts.js)
    .pipe(concat('bundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(notify({ message: 'All scripts built' }))
    .pipe(browserSync.stream());

export const copy = () =>
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const images = () =>
  gulp.src('src/images/**')
    //.pipe(imagemin())
    .pipe(gulp.dest('dist/images'));

export const browserSyncServe = (done) => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  done();
};

export const watch = () => {
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts.js, scripts);
  gulp.watch('src/**/*.html', copy);
};

// Combined tasks
export const build = gulp.parallel(styles, scripts, images, copy);
export const clean = gulp.parallel(stylesClean, scriptsClean);
export const dev = gulp.series(clean, build, browserSyncServe, watch);

// Default task
export default dev;
