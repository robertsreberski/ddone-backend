import { GraphQLServer, PubSub } from 'graphql-yoga'
import types from 'types'
import resolvers from 'resolvers'
import { isSubscriptionAuthenticated, jwtAuthentication } from 'authentication'
import initializeDb from 'db'
import { getReadableIpAddress } from 'utils/misc'

initializeDb()
const pubsub = new PubSub()

const context = ({ request }) => {
	return {
		...(request ? { currentUser: request.res.currentUser } : {}),
		pubsub,
	}
}

const options = {
	endpoint: '/app',
	subscriptions: {
		path: '/subscriptions',
		onConnect: isSubscriptionAuthenticated,
	},
	playground: '/play',
	port: 4000,
}

const server = new GraphQLServer({
	typeDefs: types,
	resolvers,
	context,
})

server.express.use(jwtAuthentication({}).unless({ path: ['/play'] }))
server.start(options, opts => {
	const printedAddress = getReadableIpAddress({
		isSecure: opts.https,
		port: opts.port,
	})

	console.log(`Server started on ${printedAddress}`)
	console.log('Interfaces: ')
	console.log(`-- API: ${printedAddress + opts.endpoint}`)
	console.log(
		`-- Subscriptions API: ${printedAddress + opts.subscriptions.path}`
	)
	console.log(`-- Playground: ${printedAddress + opts.playground}`)
})
