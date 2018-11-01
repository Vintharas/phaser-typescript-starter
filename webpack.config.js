const path = require("path");
// injects bundles in html
const HtmlWebpackPlugin = require("html-webpack-plugin");
// cleans up dist folder
const CleanWebpackPlugin = require("clean-webpack-plugin");

// Phaser libraries. Loaded as vendor libs below
// and loaded within the game via expose-loader
var phaserModule = path.join(__dirname, "/node_modules/phaser-ce/");
var phaser = path.join(phaserModule, "build/custom/phaser-split.js");
var pixi = path.join(phaserModule, "build/custom/pixi.js");
var p2 = path.join(phaserModule, "build/custom/p2.js");

module.exports = {
  entry: {
    app: ["./src/index.ts"],
    vendor: ["pixi", "p2", "phaser-ce"]
  },
  output: {
    filename: "[name].main.js",
    path: path.resolve(__dirname, "dist")
  },

  // development
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },

  module: {
    rules: [
      // typescript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      // Sprites, Spritesheets and such
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      // Phaser libs
      { test: /pixi\.js/, use: ["expose-loader?PIXI"] },
      { test: /phaser-split\.js$/, use: ["expose-loader?Phaser"] },
      { test: /p2\.js/, use: ["expose-loader?p2"] }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
    alias: {
      "phaser-ce": phaser,
      pixi: pixi,
      p2: p2
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Phaser TypeScript Starter",
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
      }
    })
  ]
};
