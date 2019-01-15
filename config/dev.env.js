'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK: 'true',
  ROOT_URL: '"http://loc-cnypa.vocy.cn/"',
  STATIC_URL: '"http://loc-cnypa.vocy.cn/static/"',
  // API_URL: '"/api/"'
  API_URL: '"/cnypa-cms/"'
  // API_URL: '"http://test.admin.vocy.cn/cnypa-cms/"'
})
