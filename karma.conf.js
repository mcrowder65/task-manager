var webpack = require("webpack");

module.exports = function (config) {
    config.set({
        browsers: ["PhantomJS"],
        singleRun: true,
        autoWatch: false,
        frameworks: ["mocha", "chai"],
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            "test/**/*.jsx"
        ],
        preprocessors: {
            "test/**/*.jsx": ["webpack", "sourcemap"]
        },
        reporters: ["spec", "coverage"],
        webpack: {
            resolve: {
                extensions: [".js", ".jsx"]
            },
            module: {
                loaders: [{
                    test: /\.jsx|.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }]
            },
            externals: {
                "react/addons": true,
                "jsdom": "window",
                "cheerio": "window",
                "react/lib/ExecutionEnvironment": true,
                "react/lib/ReactContext": true
            }
        },
        coverageReporter: {
            reporters: [
                {type: "json", file: "coverage.json"},
                {type: "lcov"},
                {type: "text"}
            ],
            dir: "./coverage/client"
        },
        webpackServer: {
            noInfo: false
        }
    });
};