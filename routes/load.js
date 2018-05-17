var fs = require('fs');
var path = require('path');
var join = path.resolve;
var readdir = fs.readdirSync;

var dataManage = require('./shujuguanli/data');

module.exports = function(app, root) {
  readdir(root).forEach(function(file) {
   var dir =  join(root, file);
   var stats = fs.lstatSync(dir);
   if(stats.isFile()) {
     var conf = require(dir);
     if(conf.routes) {
       route(app, conf);
     }
   }
  });
}

function route(app, conf) {
  var mod = require(conf.name);
  for(var key in conf.routes) {
     var prop = conf.routes[key];
     var method = key.split(' ')[0];
     var path = key.split(' ')[1];

     var fn = mod[prop];
     if(!fn) throw new Error(conf.name + ': exports.' + prop + 'is not defined');
     app[method.toLowerCase()](path, fn);
  }
}
