#!/usr/bin/env node
const minimist = require('minimist')

const error = require('./utils/error')

const run = async () => {
  const args = minimist(process.argv.slice(2))
  let cmd = args._[0] || 'help'
  if (args.version || args.v) {
    cmd = 'version'
  }
  if (args.help || args.h) {
    cmd = 'help'
  }
  switch (cmd) {
    case 'create':
      require('./cmds/create')(args)
      break
    case 'rename':
      require('./cmds/rename')(args)
      break
    case 'delete':
      require('./cmds/delete')(args)
      break
    case 'version':
      require('./cmds/version')(args)
      break
    case 'help':
      require('./cmds/help')(args)
      break
    default:
      error(`=== "${cmd}" is not a valid command`, true)
  }
}

run()
