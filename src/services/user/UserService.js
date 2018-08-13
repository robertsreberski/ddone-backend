import User from 'db/models/user/User'

export const createUser = async ({ id }) => {
	const user = new User({
		_id: id,
	})

	try {
		await user.save()
		return user
	} catch (e) {
		console.log(e)
		return null
	}
}

export const addStatus = async ({ id }, status) =>
	await appendToList(id, 'statuses', status)

export const addSession = async ({ id }, session) =>
	await appendToList(id, 'sessions', session)

export const fetchUser = async ({ id }) => {
	try {
		return await User.findById(id)
			.populate('sessions')
			.populate('statuses')
			.exec()
	} catch (e) {
		console.log(e)
		return null
	}
}

export const disableUser = async ({ id }) => {
	try {
		return await User.findOneAndUpdate(
			{ _id: id },
			{ $set: { disabled: true } },
			{ new: true }
		)
			.populate('sessions')
			.populate('statuses')
			.exec()
	} catch (e) {
		console.log(e)
		return null
	}
}

export const appendToList = async (userId, key, object) => {
	try {
		return await User.findOneAndUpdate(
			{ _id: userId },
			{ $push: { [key]: object } },
			{ new: true }
		)
			.populate('sessions')
			.populate('statuses')
			.exec()
	} catch (e) {
		console.log(e)
		return null
	}
}
