const tsconfig = require("./tsconfig.json");
let rawAlias = tsconfig.compilerOptions.paths;
let alias = {};

for (let x in rawAlias) {
  alias[x.replace("/*", "")] = rawAlias[x].map((p) => {
    return p.replace("/*", "");
  })[0];
}

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
          alias,
        },
      ],
    ],
  };
};
