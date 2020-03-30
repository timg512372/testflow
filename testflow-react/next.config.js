const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const Dotenv = require('dotenv-webpack');
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './styles.less'), 'utf8'));

module.exports = withCSS({});

module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
    },
    webpack: (config, { isServer, dev }) => {
        // Loading AntD UI
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader'
            });
        }
        // Javascript Compression
        // config.optimization.minimizer = [
        //     new UglifyJsPlugin({ uglifyOptions: { compress: { inline: false } } })
        // ];

        config.plugins = config.plugins || [];
        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
            // new CriticalPlugin({
            //     src: 'style.css',
            //     inline: true,
            //     minify: true,
            //     dest: 'style.css'
            // })
        ];
        return {
            ...config,
            node: {
                fs: 'empty',
                child_process: 'empty'
            }
        };
    }
});
