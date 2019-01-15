'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  ROOT_URL: '"http://test.admin.vocy.cn/cnypa-cms/"',
  STATIC_URL: '"http://test.admin.vocy.cn/cnypa-cms/static/"',
  API_URL: '"http://test.admin.vocy.cn/cnypa-cms/"',
})
