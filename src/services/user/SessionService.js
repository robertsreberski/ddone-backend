import Session from 'db/models/user/Session'

export const startSession = async ({ ip, device }) => {
	const session = new Session({
		device,
		ip,
		start: Date(),
		end: null,
	})

	try {
		if ((await Session.countDocuments({ ip: ip, end: null })) > 0) {
			return null
		}

		await session.save()
		return session
	} catch (e) {
		console.log(e)
		return null
	}
}

export const endSessions = async ({ ip }) => {
	try {
		const timestamp = Date.now()

		await Session.updateMany(
			{ ip: ip, end: null },
			{ $set: { end: timestamp } }
		)
		return await Session.find({ ip: ip, end: timestamp })
	} catch (e) {
		console.log(e)
		return null
	}
}
