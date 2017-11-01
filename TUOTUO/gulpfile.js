/**
 * Created by AllenFeng on 2017/3/24.
 */
const gulp = require("gulp"),
    webpackStream = require("webpack-stream"),
    webpackDevServer = require("webpack-dev-server"),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config"),
    path = require("path");


gulp.task("server", function () {
    new webpackDevServer(webpack(webpackConfig), {
        contentBase: path.resolve(__dirname, "src"),
        historyApiFallback:true,
        publicPath: webpackConfig.output.publicPath
    }).listen(9023, '192.168.4.88', function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:9023')
    })
});

