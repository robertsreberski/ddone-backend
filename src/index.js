import { GraphQLServer, PubSub } from 'graphql-yoga'
import requestIp from 'request-ip'
import types from 'types'
import resolvers from 'resolvers'
import { isSubscriptionAuthenticated, jwtAuthentication } from 'authentication'
import initializeDb from 'db'
import { getReadableIpAddress } from 'utils/misc'

initializeDb()

const pubsub = new PubSub()

const context = req => {
	return {
		...(req.connection
			? { currentUser: req.connection.context.currentUser }
			: {}),
		...(req.request
			? {
					currentUser: req.request.res.currentUser,
					ip: req.request.res.clientIp,
			  }
			: {}),
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

server.express.use(requestIp.mw())
server.express.use(jwtAuthentication({}).unless({ path: ['/play'] }))
export default server.start(options, opts => {
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
