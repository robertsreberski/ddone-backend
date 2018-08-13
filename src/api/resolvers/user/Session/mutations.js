import {
	endSessions,
} from '../../../../services/user/SessionService'


const end = async (root, args, { ip }) => {
	const sessions = await endSessions({ ip })
	console.log(sessions)
	return sessions
}

export default {
	endSessions: end,
}
