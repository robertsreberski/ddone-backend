import { expect, assert } from 'chai'
import { v4 as uuid } from 'uuid'
import sinon from 'sinon'
import 'sinon-mongoose'
import { getMockedStatus, getStubbedStatus } from './utils'

const proxyquire = require('proxyquire').noCallThru()

describe('Status Service tests', () => {
	const mockedId = uuid()

	let service
	let mockedModel
	let mockedClock
	let mockedDate

	beforeEach(() => {
		mockedClock = sinon.useFakeTimers(new Date().getTime())
		mockedDate = Date.now()

		mockedModel = getStubbedStatus({ _id: mockedId })
		service = proxyquire('../../src/services/user/StatusService.js', {
			'db/models/user/Status': mockedModel,
		})
	})

	afterEach(() => {
		mockedClock.restore()
	})

	it('startStatus() - creates status with given name and returns it', done => {
		const mockedName = uuid()

		service.startStatus({ name: mockedName }).then(status => {
			assert.isNotNull(status)
			assert.isNotNull(status.start)

			expect(status)
				.to.have.property('name')
				.with.equal(mockedName)

			done()
		})
	})

	it('getStatus() - if found, returns status with given id', done => {
		const mockedStatus = getMockedStatus({ _id: mockedId })

		mockedModel
			.expects('findById')
			.withArgs(mockedId)
			.resolves(mockedStatus)

		service.getStatus({ id: mockedId }).then(status => {
			assert.isNotNull(status)

			expect(status).to.equal(mockedStatus)
			mockedModel.verify()

			done()
		})
	})

	it('getStatus() - if not found, returns null', done => {
		mockedModel
			.expects('findById')
			.withArgs(mockedId)
			.resolves(null)

		service.getStatus({ id: mockedId }).then(status => {
			assert.isNull(status)

			done()
		})
	})

	it('endStatus() - ends and returns status with given id', done => {
		const mockedStatus = getMockedStatus({ _id: mockedId })
		mockedModel
			.expects('findOneAndUpdate')
			.withArgs({ _id: mockedId }, { $set: { end: mockedDate } }, { new: true })
			.resolves(mockedStatus)

		service.endStatus({ id: mockedId }).then(status => {
			assert.isNotNull(status)

			expect(status).to.equal(mockedStatus)
			mockedModel.verify()
			done()
		})
	})
})
