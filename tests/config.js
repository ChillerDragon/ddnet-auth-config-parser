const assert = require('node:assert').strict

const rewire = require('rewire')
const configParser = rewire('../src/ddnet_config.js')

const isCommentOrEmptyLine = configParser.__get__('isCommentOrEmptyLine')
const splitLineIntoCommand = configParser.__get__('splitLineIntoCommand')
const getCommandArgType = configParser.__get__('getCommandArgType')

assert.strictEqual(isCommentOrEmptyLine('foo'), false)
assert.strictEqual(isCommentOrEmptyLine('# foo'), true)
assert.strictEqual(isCommentOrEmptyLine(' # foo'), true)
assert.strictEqual(isCommentOrEmptyLine(' '), true)

assert.deepStrictEqual(splitLineIntoCommand('foo bar'), ['foo', 'bar'])
assert.deepStrictEqual(splitLineIntoCommand('foobar'), ['foobar'])
assert.deepStrictEqual(splitLineIntoCommand('foo                      bar'), ['foo', 'bar'])
assert.deepStrictEqual(splitLineIntoCommand('   foo  bar   '), ['foo', 'bar'])
assert.deepStrictEqual(splitLineIntoCommand('   foo  "bar"   '), ['foo', 'bar'])
assert.deepStrictEqual(splitLineIntoCommand('   foo  "bar "   '), ['foo', 'bar '])
assert.deepStrictEqual(splitLineIntoCommand('   foo  "  bar "   '), ['foo', '  bar '])
assert.deepStrictEqual(splitLineIntoCommand('   "foo"  "  bar "   '), ['foo', '  bar '])
assert.deepStrictEqual(splitLineIntoCommand('   "foo"  "  bar\' "   '), ['foo', "  bar' "])
assert.deepStrictEqual(splitLineIntoCommand('"foo"   \'bar\''), ['foo', 'bar'])

assert.throws(
  () => {
    splitLineIntoCommand('foo "bar')
  },
  {
    name: 'DDNetConfigError',
    message: /^Missing terminating quote in line: /
  }
)

assert.deepStrictEqual(splitLineIntoCommand('foo # bar'), ['foo'])
assert.deepStrictEqual(splitLineIntoCommand('foo "# bar"'), ['foo', '# bar'])
assert.deepStrictEqual(splitLineIntoCommand('foo "bar" # comment'), ['foo', 'bar'])
assert.deepStrictEqual(splitLineIntoCommand('auth_add foo helper multi word pass'), ['auth_add', 'foo', 'helper', 'multi word pass'])
assert.deepStrictEqual(splitLineIntoCommand('auth_add foo helper "multi word pass"'), ['auth_add', 'foo', 'helper', 'multi word pass'])

assert.equal(getCommandArgType('auth_add', 0), 's')
assert.equal(getCommandArgType('auth_add', 1), 's')
assert.equal(getCommandArgType('auth_add', 2), 'r')
