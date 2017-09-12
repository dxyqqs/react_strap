const webpack = require('webpack')
const path = require('path')
const CreateHTML = require("html-webpack-plugin")
const ExtractText = require("extract-text-webpack-plugin")

console.log(path.join(__dirname,"app/style"))

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.scss', '.jsx'],
    alias:{
      app:path.join(__dirname,'app'),
      components:path.join(__dirname,"app/components"),
      style:path.join(__dirname,"app/style"),
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractText.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: "expanded",
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractText.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test:/\.jsx?$/,
        use:'babel-loader',
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new ExtractText({
      filename:"[name].css"
    }),
    new CreateHTML({
      template:path.resolve(__dirname,'app/temp.html'),
      filename:"index.html"
    })
  ]
}