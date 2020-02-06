const menu = {
  main: `
		ljn-rm [command] <options>

		create ........... create a module
		rename ........... rename a module
		delete ........... delete a module
		version .......... show package version
		help ............. show help menu for a command
	`,
  create: `
		ljn-rm create [<name>]
	`,
  rename: `
		ljn-rm rename [<name>] [<new-name>]
	`,
  delete: `
		ljn-rm delete [<name>]
	`
}

module.exports = args => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
  console.log(menu[subCmd] || menu.main)
}
