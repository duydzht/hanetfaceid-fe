const createExpoWebpackConfigAsync = require("@expo/webpack-config");
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,

      babel: {
        dangerouslyAddModulePathsToTranspile: ["dripsy", "@dripsy"],
      },

      resolve: {
        extensions: [".js", ".jsx"],
      },
    },

    argv
  );
  return config;
};
