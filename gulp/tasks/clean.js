// Cleaning tasks
module.exports = function (plugins, config) {
  return function (cb) {
    plugins.del(config.path.clean);

    cb();
  };
};
