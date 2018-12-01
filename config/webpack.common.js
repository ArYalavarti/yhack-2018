const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const helpers = require("./helpers");

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";

const extractCSS = new ExtractTextPlugin({ filename: "index.css" });
const extractCSS2 = new ExtractTextPlugin({ filename: "Main.css" });
const extractCSS3 = new ExtractTextPlugin({ filename: "Blocks.css" });

module.exports = {
  entry: {
    app: [helpers.root("client/app/index.js")]
  },

  output: {
    path: helpers.root("dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".html"],
    alias: {
      app: "client/app"
    }
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root("client"),
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          // Instance 1
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      }
    ]
  },

  plugins: [
    extractCSS,
    extractCSS2,
    extractCSS3,
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root("client/public/index.html"),
      inject: "body"
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      disable: !isProd
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root("client/public")
      }
    ])
  ]
};
