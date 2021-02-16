const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("favicons-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = ({sourceDir, distDir}) => ({
    entry: {
        app: `${sourceDir}/index.js`
    },
    output: {
        path: distDir,
        publicPath: "/"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff2?|ttf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                            publicPath: "/fonts/",
                        },
                    },
                ],
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash].[ext]",
                            outputPath: "images/",
                            publicPath: "./images/",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 85,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                            gifsicle: {
                                enabled: false,
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: distDir,
        }),
        new HtmlWebpackPlugin({
            filename: `${distDir}/index.html`,
            template: `${sourceDir}/index.html`,
            API_URI: process.env.API_URI
        }),
        new WebappWebpackPlugin({
            logo: `${sourceDir}/assets/media/icons/favicon.png`,
            prefix: "images/favicons/",
            favicons: {
                appName: "Motherkids.az",
                appDescription: "Everywhere Children Are - Motherkids.az Online Kids World",
                display: "standalone",
                developerURL: null,
                background: "#ddd",
                theme_color: "#333"
            }
        }),
        new webpack.EnvironmentPlugin({
            API_URI: "http://127.0.0.1:8000/graphql/"
        }),
    ],
});