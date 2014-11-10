/*
 * Based on PhantomJS GoogleCharts Module
 * Copyright 2014 Patrick Stephan <pstephan1187@gmail.com>
 *
 * Any additional changes are my own.
 * Copyright 2014 Steven Noble <steven@snoble.net>
 *
 * The purpose of this module is to generate Google Charts
 * and return the generated SVG data.
 * 
 * This module is free to use both commercially and personally.
 * Attribution is not necessary. You may use this software
 * however you like so long as you don't sell it as-is. This
 * software is licensed under the 
 * 
 * 
 * BY USING THIS SOFTWARE, YOU AGREE TO GOOGLE'S TERMS OF USE
 * FOR THE GOOGLE CHARTS JAVASCRIPT APIS FOUND HERE:
 * https://google-developers.appspot.com/chart/terms
 */

exports.generateChart = function(jsonData, callback){
	var page = require('webpage').create();
	
	page.viewportSize = {width: jsonData.options.width, height: jsonData.options.height};
	
	// Add further options below as required if you need charts that use anything other than
  // the 'corechart' or 'gauge' modules
  
  if (jsonData.type == "Gauge")
  {
    page.content = '<html><head><title></title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script><script src="https://www.google.com/jsapi"></script><script>google.load("visualization", "1.0", {"packages":["gauge"]});</script></head><body><div id="chart">Chart did not generate</div></body></html>';
  }
  else
  {
  	page.content = '<html><head><title></title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script><script src="https://www.google.com/jsapi"></script><script>google.load("visualization", "1.0", {"packages":["corechart"]});</script></head><body><div id="chart">Chart did not generate</div></body></html>';    
  }
	
	page.onLoadFinished = function(){
		info = page.evaluate(function(jsonData){
			
      var chartData = google.visualization.arrayToDataTable(jsonData.theData);

			var options = jsonData.options;
			
			var chart = new google.visualization[jsonData.type](document.getElementById('chart'));
			chart.draw(chartData, options);
						
			var serializer = new XMLSerializer();
			return serializer.serializeToString($('#chart svg')[0]);
		}, jsonData);
		
		if(typeof callback === 'function'){
			callback(info);
		}
	}
}
