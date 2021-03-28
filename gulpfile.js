const { parallel, src, dest, watch, series } = require('gulp');
const { join, resolve, basename } = require('path');

const
  scenesToJson        = require('scenes-to-json'),
  connect             = require('gulp-connect');

/*
 * SERVER
 */
function server (cb) {

  connect.server({
      port: 9000,
      root: './dist',
      livereload: true
    });

    cb();
}


/*
 * SCENES
 */

function scenes (cb){

scenesToJson('./src', './dist/scenes', (err, data)=>{
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




/**
 * WATCH
 */

function watchDir(cb) {

 
  watch('./src/**/*.{yaml,yml}', scenes );

  cb();
};

exports.default = parallel(server, watchDir);