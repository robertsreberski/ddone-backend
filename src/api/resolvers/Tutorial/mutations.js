import {createLink,} from '../../../services/LinkService'
import {withNotify} from '../utils'
import {Subscriptions} from './subscriptions'


const mutationPost = async (root, args) => {
	const data = {
		url: args.url,
		description: args.description,
	}

	return await createLink(data)
}

export default {
	post: withNotify(Subscriptions.newLink, mutationPost),
}