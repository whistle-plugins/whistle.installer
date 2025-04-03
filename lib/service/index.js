const { whistleRequire, whistleRequirePath,  config } = require('../options');
const fork = whistleRequire('pfork').fork;
const path = require('path');

module.exports = () => {
  const options = {
    script: path.join(__dirname, 'service.js'),
    debugMode: config.debugMode,
    whistleRequirePath,
    PLUGIN_INSTALL_ROOT: config.PLUGIN_INSTALL_ROOT,
  };
  return new Promise((resolve, reject) => {
    fork(options, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};
