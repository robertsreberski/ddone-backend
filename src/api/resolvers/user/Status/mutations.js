import {endStatus, startStatus} from '../../../../services/user/StatusService'
import { addStatus } from '../../../../services/user/UserService'

const start = async (root, { name }, { currentUser }) => {
	const status = await startStatus({ name })
	await addStatus({ id: currentUser.uid }, status)

	return status
}

const end = async (root, { id }, { currentUser }) => {
	const status = await endStatus({ id })

	return status
}

export default {
	startStatus: start,
	endStatus: end,
}
