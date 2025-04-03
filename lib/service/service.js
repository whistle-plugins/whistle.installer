const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const router = require('koa-router')();
const setupRouter = require('./router');

module.exports = (options, callback) => {
  // 通过绝对路径获取 whistle 根目录的 require 方法
  // 该方法可以获取到 whistle 根目录下的文件及其依赖的模块
  const whistleRequire = require(options.whistleRequirePath);
  const getServer = whistleRequire('hagent').getServer;
  const app = new Koa();

  app.proxy = true;
  app.silent = true;
  onerror(app);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  setupRouter(router, {
    whistleRequire,
    PLUGIN_INSTALL_ROOT: options.PLUGIN_INSTALL_ROOT,
  });

  getServer(function (server, port) {
    server.on('request', app.callback());
    callback(null, { port: port });
  });
};
