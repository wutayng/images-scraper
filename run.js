'use strict'

var args_in = process.argv.slice(2);

var Scraper = require ('./index');
var search_word = args_in[0]

//Set Output dir
var output_dir = args_in[1].concat(search_word)
var output_files_prefix = output_dir.concat('/')

var mkdirp = require('mkdirp');
mkdirp(output_dir, function(err) { 
    // path exists unless there was an error
});

//downloader
const download = require('image-downloader')
var fs = require('fs');

let google = new Scraper.Google({
	keyword: search_word,
	limit: 100,
	resolution: 'l', // Resolution of Image Param
	puppeteer: {
		headless: false
	},
  tbs: {
		// every possible tbs search option, some examples and more info: http://jwebnet.net/advancedgooglesearch.html
    isz: undefined,	 				// options: l(arge), m(edium), i(cons), etc. 
    itp: undefined, 				// options: clipart, face, lineart, news, photo
		ic: undefined, 					// options: color, gray, trans
		sur: 'fc',					// options: fmc (commercial reuse with modification), fc (commercial reuse), fm (noncommercial reuse with modification), f (noncommercial reuse)
  }
});

(async () => {
	const results = await google.start();
	// Iterate though results obj and download images as filename
	var url_names = []
	var i;
	for (i = 0; i < results.length; i++) {
  		// Download to a directory and save with the original filename
		const options = {
  			url: results[i].url,
  			dest: output_files_prefix.concat(results[i].title).concat('.png')
		}
		download.image(options)
		  .then(({ filename, image }) => {
		  })
		  .catch((err) => console.error(err))
		  // Save Filenames
		  url_names.concat(results[i].url)
	}

})();


