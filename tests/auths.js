const assert = require('node:assert').strict
const path = require('path')
const authParser = require('../src/auth_parser.js')

const auths = authParser.getAuthsSync(path.join(__dirname, '/configs/passwords.cfg'))
assert.deepStrictEqual(auths, [
  { username: 'foo', role: 'mod', password: 'securepass' },
  { username: 'bar', role: 'moderator', password: 'quotedpass' },
  { username: 'baz', role: 'helper', password: 'spaced pass' },
  { username: 'joe', role: 'helper', password: 'indented entry' },
  { username: 'spaced name', role: 'mod', password: 'securepass2' },
  { username: 'mad', role: 'helper', password: 'quotedpass' },
  {
    username: 'steve',
    role: 'helper',
    password: 'non quoted multi word pass'
  },
  {
    username: 'alice',
    role: 'helper',
    password: 'non quoted multi word pass '
  },
  { username: 'foo', role: 'helper', password: 'foo ' },
  { username: 'foo', role: 'helper', password: 'foo' }
])
