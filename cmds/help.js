const menu = {
	main: `
		create-component [command]

		create ........... create a component
		rename ........... rename a component
		delete ........... delete a component
		version .......... show package version
		help ............. show help menu for a command
	`,
	create: `
		create-component create
	`,
	rename: `
		create-component rename
	`,
	delete: `
		create-component delete
	`
}

module.exports = args => {
	const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
	console.log(menu[subCmd] || menu.main)
}
