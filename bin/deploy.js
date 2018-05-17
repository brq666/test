#!/usr/bin/env node

var async = require('async');
var exec = require('child_process').exec;
var fs = require('fs');
var q = require('q');
var env = process.env.NODE_ENV || 'dev';

function execP(command, option) {
  var deferred = q.defer();
  option = option || {};

  exec(command, option, function(err, stdout, stderr) {
    if (err) {
      deferred.reject(err);
      console.log(err);
    } else {
      deferred.resolve(stdout, stderr);
    }
  });

  return deferred.promise;
}

var paths = [
  '/data/ccms-saas/ui/campaign-management', // 132, 148机器目录
  '/data/ccms-saas/campaign-management-develop' // 49机器目录
];

function deployDeve(path) {
  // 没有清空工作目录,原因是git checkout .或者 git status 会让文件权限改变!
  var option = {
    cwd: path
  };
  execP('git checkout develop', option)
    .then(function(stdout) {
      console.log("git checkout develop\n" + stdout);
      console.log('2.切换到develop分支 OK！');
      return execP('git pull origin develop', option);
    })
    .then(function(stdout) {
      console.log("git pull origin develop:develop\n" + stdout);
      return execP(' git log --before="1 seconds" -3', option);
    })
    .then(function(stdout) {
      console.log(" git log --before='1 seconds' -3(1秒前的3个提交记录):\n" + stdout);
      console.log("3.远端develop分支同步 OK!");
      console.log("努力编译样式文件中...（*＾-＾*）这一步比较费时间:");
      console.log('npm run dist:' + env + '\n');
      return execP('npm run dist:' + env, option);
    })
    .then(function(stdout) {
      console.log('前端代码发布成功!(￣▽￣)');
    });
}

function chosePath(paths) {
  var deferred = q.defer();
  var result = [];
  async.each(paths, function(item, callback) {
      fs.readdir(item, function(err, files) {
        if (!err) {
          result.push(item);
        }
        callback();
      })
    },
    function(err) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
  return deferred.promise;
}

function callback() {}

function deploy() {
  chosePath(paths)
    .then(function(out) {
      console.log(out);
      out.forEach(function(item) {
        deployDeve(item);
      });
    });
}

deploy();
