import User from '../../src/db/models/user/User'
import Status from '../../src/db/models/user/Status'
import Session from '../../src/db/models/user/Session'

import sinon from 'sinon'
import 'sinon-mongoose'


export const getStubbedUser = (data) => {
	User.prototype.save = sinon.stub().returns(new User(data))
	return sinon.mock(User)
}

export const getStubbedSession = (data) => {
	Session.prototype.save = sinon.stub().returns(new Session(data))
	return sinon.mock(Session)
}

export const getStubbedStatus = (data) => {
	Status.prototype.save = sinon.stub().returns(new Status(data))
	return sinon.mock(Status)
}

export const getMockedUser = data => new User(data)
export const getMockedStatus = (data) => new Status(data)
export const getMockedSession = data => new Session(data)