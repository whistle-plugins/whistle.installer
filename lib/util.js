const { request } = require('http');
const { whistleRequire } = require('./options');
const loadService = require('./service');
const { getReqOptions } = whistleRequire('./lib/util/common');
// 将 koa 接收的请求转发到子进程的服务
exports.forwardRequest = async (ctx) => {
  const { port } = await loadService();
  const options = getReqOptions(ctx.req, port);

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      ctx.status = res.statusCode;
      ctx.set(res.headers);
      ctx.body = res;
      resolve(res);
    });
    req.on('error', reject);
    ctx.req.pipe(req);
  });
};
