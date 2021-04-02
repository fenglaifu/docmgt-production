module.exports = {
    /* publicPath: {
        process: {
            env: {
                NODE_ENV: 'development' // production
            }
        }
    }, */
    outputDir: 'dist',
    devServer: {
        host: 'localhost',
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: { // 设置代理
            '/api': {
                target: 'http://localhost:5000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    },
    /* css: {
        loaderOptions: {
            sass: {
                prependData: `@import './assets/styles/variables.scss';`
            },
        },
    }, */
}