var GC = require('./googleCharts.js');

var system = require('system');
var fs = require('fs');
var path = system.args[1];
var opened = fs.open(path, "r");
var data = fs.read(path);
var jsonData = JSON.parse(data);


GC.generateChart(jsonData, function(svgHtml){
    console.log(svgHtml);
    phantom.exit();
});
