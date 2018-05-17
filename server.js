/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/routes');
var load = require('./routes/load');
var http = require('http');
var path = require('path');
var app = express();
var request = require('request');

// 环境是否是node直接启动
var isStartByNode = /^\d/.test(process.argv[2]);

// all environments
app.set('port', isStartByNode ? process.argv[2] : 3000); //node app.js  9090  命令指定端口号
app.set('views', __dirname + '/app/');
//app.set('view engine', 'ejs');
//使用html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(process.argv[3] || "", express.static(path.join(__dirname, '')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//app.all('*/booklist.html', authentication);
//app.all('*', function(req, res, next) {
  //if(!req.headers.cookie) {
    //var option = {
      //url: 'http://test.ccmsyun.com/auth/qiushi6/credential',
      //method: 'POST',
      //headers: {
        //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:10.0) Gecko/20100101 Firefox/10.0'
      //},
      //body: "name=admin&password=123QWEqwe"
    //};
    //request(option, function(err, data, resp) {
      //console.log(data);
      //var value = data.headers['set-cookie'][0];
      //value = value.match(/JSESSIONID=(\w+);/)[1];
      //res.cookie('JSESSIONID', value);
      //next();
    //});
  //}
  //else {
    //next();
  //}
//});
routes(app);
load(app, './routes/route');

http.createServer(app).listen(app.get('port'), function() {
  if (process.argv[3]) {
    console.log("http://localhost:" + app.get('port') + process.argv[3] + "/portal/index.html")

  } else {
    console.log("http://localhost:" + app.get('port') + "/portal/index.html")

  }
});
