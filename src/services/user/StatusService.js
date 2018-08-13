import Status from 'db/models/user/Status'

export const startStatus = async ({ name }) => {
	const status = new Status({
		name,
		start: Date.now(),
		end: null,
	})

	try {
		await status.save()
		return status
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getStatus = async ({ id }) => {
	try {
		return await Status.findById(id)
	} catch (e) {
		console.log(e)
		return null
	}
}

export const endStatus = async ({ id }) => {
	try {
		return await Status.findOneAndUpdate(
			{ _id: id },
			{ $set: { end: Date.now() } },
			{ new: true }
		)
	} catch (e) {
		console.log(e)
		return null
	}
}
