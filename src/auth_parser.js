const ddnetConfig = require('./ddnet_config.js')

const getAuthsSync = (configPath) => {
  const configData = ddnetConfig.loadConfigSync(configPath)
  console.log(configData)
}

module.exports = {
  getAuthsSync
}
