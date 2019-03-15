const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /**
   * Main import file
   */
  entry: "./src/index.js",

  /**
   * Output generate file path
   */
  output: {
    filename: "bundle.[hash].js", //add hash value to bundle.js
    /**
     * Path library is used from node.js to get absolute path
     * First argument: vairable "__dirname" is used to get current absolute path
     * Second argument: the folder where the genereated file stores
     */
    path: path.resolve(__dirname, "./dist"),
    /**
     * To set public path for loading files, publicPath: "/dist"
     * For production environment, just copy URL into it
     */
    publicPath: ""
  },

  /**
   * Mode "none" means that we don't need any optimizations.
   * Mode "production"  / "development"
   * For example, the value of "process.env.NODE_ENV" is different in different modes
   */
  mode: "development",

  /**
   * Add dev server for hot reload like Nodemon
   */
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    index: "index.html",
    port: 9000
  },

  module: {
    /**
     * When you import a file into Webpack
     * Webpack will check if you have rule for it.
     * If there is no suitable file, it will fire an error
     * Otherwise, it will use "file-loader" to import file according to the rules
     * You also need to "npm install file-loader" first
     */
    rules: [
      {
        test: /\.(png|jbg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"]
          }
        }
      }
    ]
  },

  /**
   * Plugin is used to modify how to bundles are created.
   * Plugin are additional JS libraries that do everything that loaders cannot do
   */
  plugins: [
    //Use UglifyJsPlugin to minify js
    new UglifyJsPlugin(),

    //Use MiniCssExtractPlugin to minify css
    new MiniCssExtractPlugin({ filename: "styles.[hash].css" }),

    //Use CleanWebpackPlugin to clean dist folder everytime
    new CleanWebpackPlugin(),

    //Use HtmlWebpackPlugin to generate html file
    new HtmlWebpackPlugin({
      title: "Hello world",
      meta: {
        viewport: "width=device-width, initial-scale=1"
      }
    })
  ]
};
