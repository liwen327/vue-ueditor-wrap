
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
console.log('环境变量: process.env=', process.env)
export default{
  NODE_ENV: process.env.NODE_ENV,
  ENV: env,
  API_URL: process.env.API_URL,
  STATIC_URL: process.env.STATIC_URL,
  ROOT_URL: process.env.ROOT_URL,
  API_SSO_URL: process.env.API_SSO_URL,
  API_DMP_URL: process.env.API_DMP_URL
}
