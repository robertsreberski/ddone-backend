import * as admin from 'firebase-admin'
import expressMiddleware from './expressMiddleware'
import serviceAccount from './serviceAccountKey.json'
import { mockedDecoded, isBearer } from './utils'

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

const validateHeader = async (header, failure) => {
	return mockedDecoded

	if (header && isBearer(header)) {
		const token = header.split(' ')[1]

		try {
			return await admin.auth().verifyIdToken(token)
		} catch (e) {
			console.error('ERROR: Jwt is not recognized')
			failure()
		}
	} else {
		console.log("INFO: Is not a Bearer or don't have Auth header")
		failure()
	}
}

export const isSubscriptionAuthenticated = async connectionParams => {
	const authorizationHeader = connectionParams['Authorization']

	const decoded = await validateHeader(authorizationHeader, () => {
		throw new Error('Subscription not authenticated!')
	})

	return {
		currentUser: decoded,
	}
}

export const isQueryAuthenticated = async (req, res, next) => {
	const authorization = req.header('Authorization')

	const decoded = await validateHeader(authorization, () => res.sendStatus(401))
	res.currentUser = decoded
	next()
}

export const jwtAuthentication = expressMiddleware
