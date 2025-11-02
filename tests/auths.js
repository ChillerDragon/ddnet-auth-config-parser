// const assert = require('node:assert').strict
const path = require('path')
const authParser = require('../src/auth_parser.js')

authParser.getAuthsSync(path.join(__dirname, '/configs/passwords.cfg'))
