const path = require("path");

module.exports = {
  // Entry point to our project
  entry: "./src/index.js",
  // Webpack is going to bundle all our Js files into a single file called app.js which is going to reside in the dist folder 
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  // Telling webpack to launch our app from the dist folder on port 900
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 9000
  },
  mode: "development",
  devtool: "source-map"
};
