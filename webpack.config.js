const createExpoWebpackConfigAsync = require("@expo/webpack-config");
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      node: {
        __dirname: false,
        __filename: false,
      },
      babel: {
        dangerouslyAddModulePathsToTranspile: ["dripsy", "@dripsy"],
      },
    },

    argv
  );
  return config;
};
