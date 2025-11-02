const path = require('node:path/posix')
const ddnetConfig = require('./ddnet_config.js')

const getAuthsSync = (configPath) => {
  const configRootDir = path.dirname(configPath)
  const configName = path.basename(configPath)
  const configs = ddnetConfig.loadConfigSync(configRootDir, configName, true)
  const auths = []
  configs.forEach((config) => {
    const cmd = config[0]
    const args = config.slice(1)
    if (cmd === 'auth_add') {
      if (args.length !== 3) {
        throw new Error('Got auth entry with unexpected amount of arguments. Args: ' + args.join(' '))
      }
      auths.push({ username: args[0], role: args[1], password: args[2] })
    }
  })
  return auths
}

module.exports = {
  getAuthsSync
}
