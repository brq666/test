var path = require('path');
var gulp = require('gulp');
var usemin = require('gulp-usemin-extend');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var postcss    = require('gulp-postcss');   //postcss
var rename = require("gulp-rename");        //重命名
var cssImport = require('postcss-import');  //import
var sourcemaps = require('gulp-sourcemaps');//产生sourcemaps文件
var precss = require('precss');             //precss
var autoprefixer = require('autoprefixer'); //自动补全css
var nodemon = require('nodemon');           //开发时监视文件改变后重复服务器
var gutil = require('gulp-util');           //gulp工具,用来在流中输出
var modules = require('./buildfile.json');
var argv = require('yargs').argv;
var replace = require('gulp-replace');
var env = argv.env;

var UAL_STATIC = require('./api-domain');

var DEV = true; // 开发环境

var AUTOPREFIXER = {
  browsers: [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
  ]
}

var paths = {
  // 开发环境
  dev: {
    modules: 'app/modules',
    images: 'app/images',
    css: 'app/css',
    js: 'app/js',
    components: 'app/components',
    dashboard: 'app/modules/dashboard/index.html'
  },
  // 线上环境
  dist: {
    js: 'ccms/js',
    css: 'ccms/css',
    images: 'ccms/images',
    modules: 'ccms/modules',
    components: 'ccms/components'
  }
}

var lists = modules.list;

/**
 * 自动重启node服务
 */
gulp.task('server', function() {
  require('./server.js');
});

gulp.task('clean', function(cb) {
  del('ccms', cb);
})

/*
* 替换UAL配置
 */
gulp.task('replace', function() {
  gulp.src(paths.dev.js + '/config.js')
    .pipe(gulp.dest(paths.dist.js))
});


/**
 * 编译scss为css
 */
gulp.task('sass', function() {
  return gulp.src([
        paths.dev.css + '/shuyun.lib.scss',
        paths.dev.modules + '/dashboard/dashboard.scss',
        paths.dev.modules + '/systemManage/systemManage.scss',
        paths.dev.modules + '/dataManagement/dataManagement.scss',
        paths.dev.modules + '/marketing/marketing.scss'],
        {base: 'app/modules'})
    .pipe(sourcemaps.init())
    .pipe(postcss([ cssImport(), precss(), autoprefixer(AUTOPREFIXER) ]))
    .on('error', function(err) {
      gutil.log(gutil.colors.red('scss compile error!\n') + err)})
    .pipe(rename({extname: '.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css));
})
/**
 * 复制 images
 */
gulp.task('copy-images', function () {
  gulp.src([paths.dev.images + '/**/*'])
    .pipe(gulp.dest(paths.dist.images));
})

/**
 * 复制 mxgraph
 */
gulp.task('copy-mxGraph', function () {
  gulp.src([paths.dev.modules + '/marketing/mxGraph/**/*'])
    .pipe(gulp.dest(paths.dist.modules + '/marketing/mxGraph'));
})

/**
 * 复制 iconfont
 */
gulp.task('copy-font', function () {
  gulp.src([paths.dev.css + '/**/*'])
    .pipe(gulp.dest(paths.dist.css));
})

/**
 * 复制 zip
 */
gulp.task('copy-zip', function () {
  gulp.src([paths.dev.modules + '/marketing/**/*.zip'])
    .pipe(gulp.dest(paths.dist.modules + '/marketing'));
})

/**
 * 复制 components
 */
gulp.task('copy-components', function () {
  gulp.src([paths.dev.components + '/**/**/*'])
    .pipe(gulp.dest(paths.dist.components));
})

/**
 * 复制,压缩 控制器html模板文件
 */
gulp.task('copy-modules', function () {
  lists.forEach(function(val, key) {
    console.log('\n\t' + gutil.colors.cyan('正在打包的模块：' + val) + '\n');
    gulp.src(paths.dev.modules +'/'+ val + '/**/*.html')
      .pipe(usemin({
        jsAttributes : {
          seq   : [1, 2, 3, 4, 5]
        },
        css: DEV ? []: [function() {return minifyCss()}, function() {return rev()}],
        html: DEV ? [] : [function() {return minifyHtml({empty: true, quotes: true})}],
        cssHtml: function(path) {
          path = path.replace('../../', '/ccms/');
          return "<link rel='stylesheet' href='"+ path +"' />";
        },
        js: DEV ? [] : [function() {return rev()}, function() {return uglify();}],
        jsHtml: function(path) {
          path = path.replace('../../', '/ccms/');
          return "<script src='"+ path +"'><\/script>";
        },
      }))
      .pipe(gulp.dest(paths.dist.modules + '/'+ val ));
  })
});

gulp.task('build-client', function() {
  runSequence('replace', 'sass', [
    'copy-components',
    'copy-mxGraph',
    'copy-font',
    'copy-modules',
    'copy-zip'
  ]);
});

// 输出banner
function showWelcome(){
    var banner = [
    'welcome to CCMS, The service start successfully, npm task:',
    'npm start      ------ 开发环境',
    'npm run dist   ------ 线上打包发布'
  ].join('\n\t');

  console.log('\n\t' + gutil.colors.cyan(banner) + '\n');
}


// 开发 dist
gulp.task('dev',function() {
  DEV = true;
  runSequence('clean', ['copy-images', 'build-client'], function() {

  });
});

// 开发 watch
gulp.task('watch',function() {
  DEV = true;
  runSequence('clean', ['server', 'copy-images', 'build-client'], function() {
  	console.log('please open localhost:3000 and develop');
  	gulp.watch(['app/**/*.scss', 'app/**/*.js', 'app/**/*.html'], ['build-client']);
  });
});

// 线上打包发布 dist
gulp.task('dist',function() {
  DEV = false;
  runSequence('clean', ['copy-images', 'build-client'])
});
