import {startSession} from '../../../../services/user/SessionService'
import {startStatus} from '../../../../services/user/StatusService'
import {addSession, addStatus, createUser, fetchUser} from '../../../../services/user/UserService'


export const DEFAULT_STATUS = 'BETA'


const init = async (root, {device}, { currentUser, ip }) => {
	let user = await fetchUser({ id: currentUser.uid })

	if (user === null) {
		user = await createUser({ id: currentUser.uid })

		const status = await startStatus({ name: DEFAULT_STATUS })
		if (status !== null) {
			user = await addStatus(
				{ id: user._id },
				status
			)
		}
	}

	const session = await startSession({ ip, device })
	if (session === null) return user

	return await addSession({ id: currentUser.uid }, session)
}

export default {
	initSession: init
}
