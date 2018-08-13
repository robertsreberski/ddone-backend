import { getStatus } from '../../../../services/user/StatusService'

const status = async (root, { id }) => {
	return await getStatus({ id })
}

export default {
	status
}
