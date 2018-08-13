import { fetchUser } from '../../../../services/user/UserService'

const userDetails = async (root, args, { currentUser }) => {
	return await fetchUser({ id: currentUser.uid })
}

export default {
	userDetails,
}
