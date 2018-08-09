export const Subscriptions = {
	newLink: {
		key: 'newLink',
		channel: 'SUBSCRIPTION_NEW_LINK'
	}
}

const subscribeNewLink = (root, args, { pubsub, currentUser }) =>
	pubsub.asyncIterator(`${Subscriptions.newLink.channel}.${currentUser.uid}`)

export default {
	newLink: {
		subscribe: subscribeNewLink,
	},
}
