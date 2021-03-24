const { parallel, src, dest, watch, series } = require('gulp');
const { join, resolve, basename } = require('path');

const
  scenesToJson        = require('scenes-to-json');


/*
 * SCENES
 */

function scenes (cb){


scenesToJson('./src', './dist/scenes', (err, data)=>{
  if(err){
     console.log(`[ ${err.reason} ]`);
     console.log('line', err.mark.line, 'column', err.mark.column)
     console.log(err.mark.snippet);
    
  }

  cb();

})

};




/**
 * WATCH
 */

function watchDir(cb) {

  watch('./src/*.{yaml,yml}', scenes );
  watch('./src/**/*.{yaml,yml}', scenes );

  cb();
};

exports.default = series(watchDir);