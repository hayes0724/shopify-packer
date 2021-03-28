const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

class IncludeLiquidStylesPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('IncludeLiquidStyles', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'IncludeLiquidStylesPlugin',
        (data, cb) => {
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
