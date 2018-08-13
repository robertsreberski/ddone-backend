import { expect, assert } from 'chai'
import { v4 as uuid } from 'uuid'
import sinon from 'sinon'
import 'sinon-mongoose'

import {
	getMockedSession,
	getMockedStatus,
	getMockedUser,
	getStubbedUser,
} from './utils'

const proxyquire = require('proxyquire').noCallThru()

describe('User Service tests', () => {
	const mockedId = uuid()

	let service
	let mockedModel

	beforeEach(() => {
		mockedModel = getStubbedUser({ _id: mockedId })
		service = proxyquire('../../src/services/user/UserService.js', {
			'db/models/user/User': mockedModel,
		})
	})

	it('createUser() - returns user with given id', done => {
		service.createUser({ id: mockedId }).then(user => {
			assert.isNotNull(user)

			expect(user)
				.to.have.property('_id')
				.with.equal(mockedId)

			done()
		})
	})

	it('addStatus() - returns user with additional status', done => {
		const mockedStatus = getMockedStatus({
			_id: mockedId,
			name: uuid(),
			start: new Date(),
		})

		mockedModel
			.expects('findOneAndUpdate')
			.withArgs(
				{ _id: mockedId },
				{ $push: { ['statuses']: mockedStatus } },
				{ new: true }
			)
			.chain('populate', 'sessions')
			.chain('populate', 'statuses')
			.chain('exec')
			.resolves(getMockedUser({ _id: mockedId, statuses: [mockedStatus] }))

		service.addStatus({ id: mockedId }, mockedStatus).then(user => {
			assert.isNotNull(user)

			expect(user)
				.to.have.property('_id')
				.with.equal(mockedId)
			expect(user)
				.to.have.property('statuses')
				.with.lengthOf(1)
			mockedModel.verify()
			done()
		})
	})

	it('addSession() - returns user with additional session', done => {
		const mockedSession = getMockedSession({
			_id: mockedId,
			device: uuid(),
			ip: uuid(),
			start: new Date(),
		})

		mockedModel
			.expects('findOneAndUpdate')
			.withArgs(
				{ _id: mockedId },
				{ $push: { ['sessions']: mockedSession } },
				{ new: true }
			)
			.chain('populate', 'sessions')
			.chain('populate', 'statuses')
			.chain('exec')
			.resolves(getMockedUser({ _id: mockedId, sessions: [mockedSession] }))

		service.addSession({ id: mockedId }, mockedSession).then(user => {
			assert.isNotNull(user)

			expect(user)
				.to.have.property('_id')
				.with.equal(mockedId)
			expect(user)
				.to.have.property('sessions')
				.with.lengthOf(1)
			mockedModel.verify()
			done()
		})
	})

	it('fetchUser() - returns matching user', done => {
		const mockedUser = getMockedUser({
			_id: mockedId,
		})

		mockedModel
			.expects('findById')
			.withArgs(mockedId)
			.chain('populate', 'sessions')
			.chain('populate', 'statuses')
			.chain('exec')
			.resolves(mockedUser)

		service.fetchUser({ id: mockedId }).then(user => {
			assert.isNotNull(user)

			expect(user).to.equal(mockedUser)
			mockedModel.verify()
			done()
		})
	})

	it('disableUser() - returns updated, disabled user', done => {
		const mockedUser = getMockedUser({
			_id: mockedId,
			disabled: true,
		})

		mockedModel
			.expects('findOneAndUpdate')
			.withArgs({ _id: mockedId }, { $set: { disabled: true } }, { new: true })
			.chain('populate', 'sessions')
			.chain('populate', 'statuses')
			.chain('exec')
			.resolves(mockedUser)

		service.disableUser({ id: mockedId }).then(user => {
			assert.isNotNull(user)

			expect(user).to.equal(mockedUser)
			mockedModel.verify()
			done()
		})
	})

	it('appendToList() - pushing given objects to selected list', done => {
		const mockedKey = uuid()
		const mockedObject = {
			mocked: uuid(),
		}
		const mockedResult = uuid()

		mockedModel
			.expects('findOneAndUpdate')
			.withArgs(
				{ _id: mockedId },
				{ $push: { [mockedKey]: mockedObject } },
				{ new: true }
			)
			.chain('populate', 'sessions')
			.chain('populate', 'statuses')
			.chain('exec')
			.resolves(mockedResult)

		service.appendToList(mockedId, mockedKey, mockedObject).then(result => {
			assert.isNotNull(result)

			expect(result).to.equal(mockedResult)
			mockedModel.verify()
			done()
		})
	})
})
