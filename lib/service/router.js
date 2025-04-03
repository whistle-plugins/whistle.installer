const npminstall = require('npminstall');
const path = require('path');

module.exports = (router, {
  whistleRequire,
  PLUGIN_INSTALL_ROOT,
}) => {
  // 获取 whistle 项目内的 common 工具方法
  const common = whistleRequire('./lib/util/common');
  // 获取插件里面设置的 peerPlugins
  const getPeerPlugins = (data) => {
    return new Promise((resolve) => {
      const list = data.pkgs.map((pkg) => {
        return { name: pkg.name, root: path.join(PLUGIN_INSTALL_ROOT, pkg.name) };
      });
      common.getPeerPlugins(list, (pkgs) => {
        resolve(pkgs);
      });
    });
  };

  router.post('/cgi-bin/install', async (ctx) => {
    let data = common.parsePlugins(ctx.request.body);
    if (data) {
      const cache = {};
      // 安装单个插件
      const installPlugin = (pkg) => {
        const root = path.join(PLUGIN_INSTALL_ROOT, pkg.name);
        if (cache[root]) {
          return;
        }
        cache[root] = true;
        return npminstall({
          pkgs: [pkg],
          registry: data.registry,
          root,
        });
      };
      await Promise.all(data.pkgs.map(installPlugin));
      const pkgs = await getPeerPlugins(data);
      if (pkgs.length) {
        pkgs.forEach(installPlugin);
      }
    }
    ctx.body = { ec: 0 };
  });
};
