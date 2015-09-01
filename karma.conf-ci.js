// Karma configuration
// Generated on Mon Aug 31 2015 11:25:46 GMT+0530 (IST)

var fs = require('fs');

module.exports = function(config) {


  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    }
    ,'SL_FireFox': {
      base: 'SauceLabs',
      browserName: 'firefox',
    }
    ,'sl_ie_10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    }
    ,'sl_ie_9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    }
    /*,'sl_ie_8': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '8'
    }*/
  };


  config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: '',


	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['browserify', 'jasmine'],


	// list of files / patterns to load in the browser
	files: [
	  'app/js/*.js',
	  'test/**/*Spec.js'
	],


	// list of files to exclude
	exclude: [
	],


	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
	  'app/js/*.js': ['browserify'],
	  'test/**/*Spec.js': ['browserify']
	},

	browserify: {
	  degbug: true,
	  transform: ['babelify']
	},

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	reporters: ['spec', 'saucelabs'],


	// web server port
	port: 9876,


	// enable / disable colors in the output (reporters and logs)
	colors: true,


	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_ERROR,


	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: false,


	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	saucelabs: {
	  testName: 'UL google search test'
	},
	captureTimeout: 120000,
	customLaunchers: customLaunchers,
	browsers: Object.keys(customLaunchers),


	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: true
  })
}
