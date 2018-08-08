import { v4 as uuidv4 } from 'uuid'
import {
	fetchAllLinks,
	createLink,
	observeNewLinks,
} from '../../services/LinkService'

const queryFeed = async () => {
	return await fetchAllLinks()
}

const mutationPost = async (root, args) => {
	const data = {
		url: args.url,
		description: args.description,
	}

	return await createLink(data)
}

const subscribeNewLink = (root, args, { pubsub }) => {
	const channel = uuidv4()

	observeNewLinks(data => {
		pubsub.publish(channel, { newLink: data })
	})

	return pubsub.asyncIterator(channel)
}

export default {
	Query: {
		info: (root, args, context) => {
			return context.currentUser.uid
		},
		feed: queryFeed,
	},
	Mutation: {
		post: mutationPost,
	},
	Subscription: {
		newLink: {
			subscribe: subscribeNewLink,
		},
	},
	Link: {
		id: root => root._id,
		description: root => root.description,
		url: root => root.url,
	},
}
