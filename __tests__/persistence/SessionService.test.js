import { expect, assert } from 'chai'
import { v4 as uuid } from 'uuid'
import sinon from 'sinon'
import 'sinon-mongoose'

import {getMockedSession, getStubbedSession} from './utils'

const proxyquire = require('proxyquire').noCallThru()

describe('Session Service tests', () => {
	const mockedId = uuid()
	const mockedIp = uuid()
	const mockedDevice = uuid()

	let service
	let mockedModel
	let mockedClock
	let mockedDate

	beforeEach(() => {
		mockedClock = sinon.useFakeTimers(new Date().getTime())
		mockedDate = Date.now()

		mockedModel = getStubbedSession({ _id: mockedId, start: mockedDate })
		service = proxyquire('../../src/services/user/SessionService.js', {
			'db/models/user/Session': mockedModel,
		})
	})

	afterEach(() => {
		mockedClock.restore()
	})

	it("startSession() - if active session for given ip DOESN'T exist, creates session with start=Date.now() and returns it", done => {
		mockedModel
			.expects('countDocuments')
			.withArgs({ ip: mockedIp, end: null })
			.resolves(0)

		service
			.startSession({ ip: mockedIp, device: mockedDevice })
			.then(session => {
				assert.isNotNull(session)
				assert.isNotNull(session.start)

				expect(session)
					.to.have.property('device')
					.with.equal(mockedDevice)
				expect(session)
					.to.have.property('ip')
					.with.equal(mockedIp)

				mockedModel.verify()
				done()
			})
	})

	it('startSession() - if active session for given ip DOES exist, returns null', done => {
		mockedModel
			.expects('countDocuments')
			.withArgs({ ip: mockedIp, end: null })
			.resolves(1)

		service
			.startSession({ ip: mockedIp, device: mockedDevice })
			.then(session => {
				assert.isNull(session)

				mockedModel.verify()

				done()
			})
	})

	it('endSessions() - ends all active sessions for given ip and returns them', done => {
		const mockedSession = getMockedSession({
			_id: mockedId,
			device: mockedDevice,
			ip: mockedIp,
			start: mockedDate,
		})

		mockedModel
			.expects('updateMany')
			.withArgs({ ip: mockedIp, end: null }, { $set: { end: mockedDate } })

		mockedModel
			.expects('find')
			.withArgs({ ip: mockedIp, end: mockedDate })
			.resolves(mockedSession)

		service.endSessions({ ip: mockedIp }).then(session => {
			assert.isNotNull(session)

			expect(session).to.equal(mockedSession)
			mockedModel.verify()

			done()
		})
	})
})
