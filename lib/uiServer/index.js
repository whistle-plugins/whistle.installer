const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const serve = require('koa-static');
// const path = require('path');
// const router = require('koa-router')();
// const setupRouter = require('./router');
const { forwardRequest } = require('../util');

// const MAX_AGE = 1000 * 60 * 5;

module.exports = (server) => {
  const app = new Koa();
  app.proxy = true;
  app.silent = true;
  onerror(app);
  app.use(async (ctx, next) => {
    // npminstall 比较耗时，避免影响到主进程性能，采用起子进程安装插件
    if (ctx.path === '/cgi-bin/install') {
      return forwardRequest(ctx);
    }
    await next();
  });
  // app.use(bodyParser());
  // app.use(router.routes());
  // app.use(router.allowedMethods());
  // app.use(serve(path.join(__dirname, '../../public'), { maxage: MAX_AGE }));
  // setupRouter(router);
  server.on('request', app.callback());
};
