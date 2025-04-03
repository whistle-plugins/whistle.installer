const setupOptions = require('./lib/options');
// initial.js 文件会在插件代码被执行之前执行
// 这里是为了给插件提供一个初始化的机会
// 例如在这里可以设置一些全局的配置
module.exports = (options) => {
  setupOptions(options);
};
