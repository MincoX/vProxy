const webpack = require('webpack')
module.exports = {
    publicPath: '/static/',
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                'vue-resource': 'VueResource',
                "chart.js": "Chart",
                'jquery': '$',
            })
        })
    }
}
