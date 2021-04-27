const HtmlWebpackPlugin = require('html-webpack-plugin');

class IncludeLiquidStylesPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('IncludeLiquidStyles', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'IncludeLiquidStylesPlugin',
        (data, cb) => {
          // Clean up JS escaped characters in vendor files
          data.assets.js = data.assets.js.map((file) =>
            file.includes('%40') ? file.replace(/%40/g, '@') : file
          );
          // Clean up CSS escaped characters in vendor files
          data.assets.css = data.assets.css.map((file) =>
            file.includes('%40') ? file.replace(/%40/g, '@') : file
          );
          // Add liquid (s)css files to html webpack plugin
          compilation.chunks.forEach((chunk) => {
            if (chunk.auxiliaryFiles) {
              chunk.auxiliaryFiles.forEach((file) => {
                if (file.includes('styleLiquid')) {
                  data.assets.css.push(
                    file.replace(/(\.css)?\.liquid$/, '.css')
                  );
                }
              });
            }
          });
          cb(null, data);
        }
      );
    });
  }
}

module.exports = IncludeLiquidStylesPlugin;
