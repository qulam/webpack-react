const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({sourceDir, distDir}) => ({
    output: {
        filename: "static/js/[name].[contenthash].js"
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[hash:base64:6]'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash].css",
            chunkFilename: "static/css/[id].[hash].css"
        })
    ]
});