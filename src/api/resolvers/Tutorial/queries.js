import { fetchAllLinks } from '../../../services/LinkService'

const queryFeed = async () => {
	return await fetchAllLinks()
}

const info = async (root, args, { currentUser }) => currentUser.uid

export default {
	info: info,
	feed: queryFeed,
}
