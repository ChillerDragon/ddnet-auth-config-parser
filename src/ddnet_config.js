const fs = require('node:fs')

class DDNetConfigError extends Error {
  constructor (message, options) {
    super(message, options)
    this.name = 'DDNetConfigError'
  }
}

const isCommentOrEmptyLine = (line) => {
  // is comment
  if (/^\s*#/.test(line)) {
    return true
  }
  // is empty
  if (/^\s*$/.test(line)) {
    return true
  }
  return false
}

const splitLineIntoCommand = (line) => {
  const args = []
  let currentArgType = 'sep'
  let currentQuote = null
  let currentArg = ''
  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    // comments terminate the entire line
    if (currentQuote === null && char === '#') {
      break
    }

    // skip spaces between args
    if (currentArgType === 'sep') {
      if (/\s/.test(char)) {
        continue
      }

      // TODO: instead of assuming all args to be "s"
      //       lookup some command to arg type mapping
      currentArgType = 's'

      // start new quoted arg
      if (char === '"' || char === "'") {
        currentQuote = char
        continue
      }
    }

    if (currentArgType === 's') {
      // space or EOL terminate unquoted string arg
      if (currentQuote === null) {
        if (/\s/.test(char)) {
          args.push(currentArg)
          currentArg = ''
          currentArgType = 'sep'
          currentQuote = null
          continue
        }
      }
      // matching quote terminates quoted arg
      if (currentQuote === char) {
        args.push(currentArg)
        currentArg = ''
        currentArgType = 'sep'
        currentQuote = null
        continue
      }

      currentArg += char
    }
  }

  if (currentQuote) {
    throw new DDNetConfigError('Missing terminating quote in line: ' + line)
  }

  if (currentArg.length > 0) {
    args.push(currentArg)
  }
  return args
}

// load a ddnet autoexec.cfg or autoexec_server.cfg
const loadConfigSync = (configPath, stripCommentsAndSpaces) => {
  const data = fs.readFileSync(configPath, 'utf8')
  const lines = []
  data.split('\n').forEach((line) => {
    if (stripCommentsAndSpaces && isCommentOrEmptyLine(line)) {
      return
    }
    lines.push(splitLineIntoCommand(line))
  })
  return lines
}

module.exports = {
  loadConfigSync
}
