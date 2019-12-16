#!/usr/bin/env node

const create = require('./cmds/create')

const run = async () => {
  await create()
}

run()
