const { parallel, src, dest, watch, series } = require('gulp');
const { join, resolve, basename } = require('path');

const
  scenesToJson        = require('scenes-to-json'),
  connect             = require('gulp-connect'),
  concat              = require('gulp-concat');

const
  _dist               = resolve(__dirname, './game/dist');
/*
 * SERVER
 */
function server (cb) {

  connect.server({
      port: 9000,
      root: _dist,
      livereload: true
    });

    cb();
}


/*
 * SCENES
 */

function scenes (cb){

let _src = resolve(__dirname,'./game/src/scenes');
let _dist = resolve(__dirname,'./game/dist/scenes');  

scenesToJson( _src, _dist, (err, data)=>{
  if(err){
    console.log(`[ ${err.reason} ]`);
    console.log('line', err.mark.line, 'column', err.mark.column)
    console.log(err.mark.snippet); 
    
    cb();
  }else{
    src('./').pipe(connect.reload());
    cb();
  }

})

};

/*
 * lib
 */

function lib (cb) {

return src('./game/src/lib/*.js')
      .pipe( concat('lib.js') )
      .pipe( dest('./game/dist/app/') )
      .pipe(connect.reload());

  cb();
}

/*
 * PLUGINS
 */

function plugins (cb) {

return src('./game/src/plugins/**/*.js')
      .pipe( concat('plugins.js') )
      .pipe( dest('./game/dist/app/') )
      .pipe(connect.reload());

  cb();
}

/**
 * WATCH
 */

function watchDir(cb) {
  watch('./game/src/scenes/**/*.{yaml,yml}', scenes );
  watch('./game/src/lib/*.js', lib);
  watch('./game/src/plugins/**/*.js', plugins);
  cb();
};

exports.default = parallel(server, watchDir);