const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const path = require('path');

module.exports = {
    entry: './src/index',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3001,
    },
    output: {
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                }]
            },
            {
                test: /bootstrap\.tsx$/,
                loader: 'bundle-loader',
                options: {
                    lazy: true,
                },
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
        ],
    },
    plugins: [
        new StatoscopeWebpackPlugin({
            saveOnlyStats: false,
            saveStatsTo: './dist/build_info/stats.json',
            saveTo: './dist/build_info/statoscopeReport.html',
            statsOptions: {
                all: false,
                assets: true,
                chunks: true,
                chunkModules: true,
                source: true,
                errors: true,
                errorDetails: true,
                warnings: true,
                hash: true,
                version: true,
                timings: true,
                builtAt: true,
                entrypoints: true,
                chunkRelations: true,
                dependentModules: true,
                ids: true,
                nestedModules: true,
                modulesSpace: 'Infinity',
                chunkModulesSpace: 'Infinity',
                nestedModulesSpace: 'Infinity',
                assetsSpace: 'Infinity',
                cachedAssets: true,
                usedExports: true,
                providedExports: true,
                modulesSort: 'depth',
                chunkModulesSort: 'name',
                nestedModulesSort: false,
                chunksSort: false,
                assetsSort: '!size'
            }
        }),
        new ModuleFederationPlugin({
            name: 'app1',
            shared: ['react', 'react-dom'],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
