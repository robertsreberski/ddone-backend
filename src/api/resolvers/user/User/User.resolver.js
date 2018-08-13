import queries from './queries'
import mutations from './mutations'
import subscriptions from './subscriptions'

const getSessions = (root, { active }) => {
	return root.sessions.map(session => {
		if (active === undefined) return session
		if (active && session.end === null) return session
		if (!active && session.end !== null) return session
	}).filter(obj => obj != null)
}

const getStatuses = (root, { active }) => {
	return root.statuses.map(status => {
		if (active === undefined) return status
		if (active && status.end === null) return status
		if (!active && status.end !== null) return status
	}).filter(obj => obj != null)
}

const getToken = async (root, args, {currentUser}) => {
	return await currentUser.getIdToken()
}

export default {
	Query: queries,
	Mutation: mutations,
	Subscription: subscriptions,
	User: {
		id: (root, args, { currentUser }) => currentUser.uid,
		email: (root, args, { currentUser }) => currentUser.email,
		name: (root, args, { currentUser }) => currentUser.name,
		token: getToken,
		photoURL: (root, args, { currentUser }) => currentUser.picture,
		emailVerified: (root, args, { currentUser }) => currentUser.emailVerified,
		disabled: root => root.disabled,
		sessions: getSessions,
		statuses: getStatuses,
	},
}
