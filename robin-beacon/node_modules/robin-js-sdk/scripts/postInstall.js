#!/usr/bin/env node
/*
 * robin-js-sdk
 * http://getrobin.com/
 *
 * Copyright (c) 2014 Robin Powered Inc.
 * Licensed under the Apache v2 license.
 * https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE
 *
 */


/**
 * This is a self-contained script that is run after an npm install.
 * It generates a both verbose and minified versions of this sdk for web browsers
 */
(function () {
  var Browserify = require('browserify'),
      Uglify = require('uglify-js'),
      fs = require('fs'),
      browserify,
      browserifyOptions,
      startTime,
      endTime,
      progressInterval,
      inputFile = __dirname + '/../robin.js',
      distDir = __dirname + '/../dist',
      outputFileName = 'robin.browser.js',
      outputFilePath = distDir + '/' + outputFileName,
      outputFileMinifiedName = 'robin.browser.min.js',
      outputFileMinifiedPath = distDir + '/' + outputFileMinifiedName,
      generateBrowserFiles,
      copyrightNotice = '/*' +
         '* robin-js-sdk' +
         '* http://getrobin.com/' +
         '*' +
         '* Copyright (c) 2014 Robin Powered Inc.' +
         '* Licensed under the Apache v2 license.' +
         '* https://github.com/robinpowered/robin-js-sdk/blob/master/LICENSE' +
         '*' +
         '*/';

  generateBrowserFiles = function () {
    fs.mkdir(distDir, function (err) {
      if (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
      process.stdout.write('Generating a version of Robin for the browser: [=');
      progressInterval = setInterval(function () {
        process.stdout.write('=');
      }, 100);
      browserify = new Browserify();
      browserifyOptions = {
        standalone: 'Robin',
        basedir: './'
      };
      browserify.add(inputFile);
      startTime = +new Date();
      browserify.bundle(browserifyOptions, function (err, verboseSrc) {
        var duration;
        if (err) {
          throw err;
        }
        clearInterval(progressInterval);
        endTime = +new Date();
        duration = (endTime - startTime)/1000;
        duration = duration.toFixed(2);
        console.log('=] 100%');
        console.log('Generated verbose source file in: ' + duration + ' seconds.');
        fs.writeFile(outputFilePath, verboseSrc, function (err) {
          var uglified,
              toplevel,
              compressor;
          if (err) {
            throw err;
          }
          console.log('Verbose source file saved to dist/robin.browser.js');
          process.stdout.write('Generating minified version of Robin: [=');
          progressInterval = setInterval(function () {
            process.stdout.write('=');
          }, 100);

          startTime = +new Date();
          toplevel = Uglify.parse(fs.readFileSync(outputFilePath, 'utf8'), {filename: 'robin.browser.js'});

          uglified = Uglify.OutputStream({
            ascii_only: true,
            source_map: false
          });

          compressor = Uglify.Compressor({
            warnings: false
          });

          toplevel.figure_out_scope();
          toplevel = toplevel.transform(compressor);
          toplevel.figure_out_scope();
          toplevel.compute_char_frequency(true);
          toplevel.mangle_names(true);
          toplevel.print(uglified);

          clearInterval(progressInterval);

          endTime = +new Date();
          duration = (endTime - startTime)/1000;
          duration = duration.toFixed(2);
          console.log('=] 100%');
          console.log('Generated minified browser file in: ' + duration + ' seconds.\n');
          fs.writeFile(outputFileMinifiedPath, copyrightNotice + uglified.toString(), function (err) {
            if (err) {
              throw err;
            }
            console.log('Minified source file saved to dist/robin.browser.min.js');
          });
        });
      });
    });
  };

  return generateBrowserFiles();
}).call(this);
