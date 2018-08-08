import unless from 'express-unless'
import {isQueryAuthenticated} from './index'


export default middlewareOptions => {
	const func = isQueryAuthenticated
	func.unless = unless

	return func
}
