import Link from 'db/models/Link'

export const fetchAllLinks = async () => {
	const found = await Link.find({})

	return found
}

export const createLink = async ({ url, description }) => {
	const link = new Link({
		url,
		description,
	})

	await link.save(err => {
		if (err) console.error(err)
	})

	return link
}

export const observeNewLinks = callback => {
	Link.watch().on('change', ({ fullDocument }) => {
		callback(fullDocument)
	})
}
