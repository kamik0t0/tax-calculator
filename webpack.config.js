const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };
    if (!isDev) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return config;
};

const createRuleWithPreset = (ext, rule) => {
    const extension = new RegExp(`\.${ext}$`);
    return {
        test: extension,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [rule],
            },
        },
    };
};

// наименования файлов в зависимости от сборки
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./index.tsx",
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist"),
        publicPath: "/tax-calculator/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: true,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist"),
                },
                {
                    from: path.resolve(__dirname, "src/404.html"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new MiniCssExtractPlugin({ filename: filename("css") }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.сss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(jpg|png|gif|svg)$/i,
                type: "asset/resource",
            },
            createRuleWithPreset("js", "@babel/preset-env"),
            createRuleWithPreset("ts", "@babel/preset-typescript"),
            createRuleWithPreset("tsx", "@babel/preset-react"),
        ],
    },
    resolve: {
        alias: {
            "@sharedcomponents": path.resolve(
                __dirname,
                "src/shared/components"
            ),
            "@customhooks": path.resolve(__dirname, "src/hooks"),
            "@helpers": path.resolve(__dirname, "src/helpers"),
            "@scripts": path.resolve(__dirname, "src/scripts"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@reduxhooks": path.resolve(__dirname, "src/redux/hooks"),
            "@salarystore": path.resolve(__dirname, "src/pages/accrual/slice"),
            "@uistore": path.resolve(__dirname, "src/redux/ui-slice"),
            "@dialogstore": path.resolve(__dirname, "src/redux/dialog-slice"),
            "@invoicesstore": path.resolve(__dirname, "src/pages/vat/slice"),
            "@calcstore": path.resolve(__dirname, "src/pages/calculator/slice"),
            "@finestore": path.resolve(__dirname, "src/pages/fines/slice"),
            "@themes": path.resolve(__dirname, "src/themes"),
            "@router": path.resolve(__dirname, "src/routers"),
            "@components": path.resolve(__dirname, "src/components"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".jpg"],
    },
    optimization: optimization(),
    // возможность видеть исходный код в инструментах разработчика
    devtool: isDev && "source-map",
    devServer: {
        port: 4200,
        // react-router-dom
        historyApiFallback: true,
        // contentBase: "./",
    },
};
