import queries from './queries'
import mutations from './mutations'
import subscriptions from './subscriptions'

export default {
	Query: queries,
	Mutation: mutations,
	Subscription: subscriptions,
	Link: {
		id: root => root._id,
		description: root => root.description,
		url: root => root.url,
	},
}
