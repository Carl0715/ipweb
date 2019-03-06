'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://api.seseda69.com"'
    // BASE_API: '"http://172.16.18.220:82"'
    BASE_API: '"http://45.249.93.79"'
    // BASE_API: '"http://www.video.com"'
})