const path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const cwd = process.cwd(),
  DEFAULT_OUTPUT_PATH = "dist",
  cnf = parseWebpackConfig(require(path.resolve(cwd, "package.json")))

module.exports = {
  devtool: cnf.devtool,
  entry: cnf.entry,
  mode: cnf.mode,
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([cnf.output.path || DEFAULT_OUTPUT_PATH]),
    new HtmlWebpackPlugin({
      title: "TS-Starter",
      template: "src/page/index.html",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: cnf.output,
}

// @todo improve
function parseWebpackConfig(cnf) {
  let {
    webpack,
  } = cnf
  let {
    output = {},
  } = webpack
  return {
    devtool: 'inline-source-map',
    mode: "development",
    ...webpack,
    output: {
      filename: '[name]',
      ...output,
      path: path.resolve(cwd, output.path || DEFAULT_OUTPUT_PATH),
    }
  }
}