### 开发预备
* 安装 [node.js](https://nodejs.org/)

### 开发环境
```shell
$ npm install 下载node依赖  (国内下载过慢,请挂载淘宝npm镜像 [taobao npm](http://npm.taobao.org/))
$ npm start 或者 gulp dev   (后者需要全局安装gulp   `npm install gulp -g`)
```

### 说明
入口地址: localhost:3000

开发环境会用browserSync的localhost:3002代理localhost:3000

### 特性
scss文件自动添加前缀, 不需要自己写前缀. (比如 -webkit-这样的不用写).

样式文件改变后,浏览器会自动流刷新页面,试试看看到效果,不需要手动刷新.

更改node代码后,自动重启node服务.不需要手动重启服务(比如改变mock的数据).

### 样式检测
```shell
npm run csslint
```

### 发布
```shell
npm run dist 或者 gulp dist    (后者需要全局安装gulp   `npm install gulp -g`)
```
