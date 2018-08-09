export const withNotify = (subscription, mutation) => (
	root,
	args,
	context,
	info
) => {
	const { pubsub, currentUser } = context
	const { key, channel } = subscription

	const result = mutation(root, args, context, info)

	pubsub.publish(`${channel}.${currentUser.uid}`, { [key]: result })
	return result
}
