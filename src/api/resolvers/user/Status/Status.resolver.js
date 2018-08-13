import queries from './queries'
import mutations from './mutations'
import subscriptions from './subscriptions'

export default {
	Query: queries,
	Mutation: mutations,
	Subscription: subscriptions,
	Status: {
		id: root => root._id,
	}
}
