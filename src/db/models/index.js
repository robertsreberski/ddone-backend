import fs from 'file-system'

fs.recurseSync(__dirname, ['**/*.js'], (filepath, relative, filename) => {
	if (!filename || filename === 'index.js') return null

	module.exports[filename] = require(`./${relative}`)
})