import sinon from 'sinon'
import 'sinon-mongoose'
import {v4 as uuid} from 'uuid'
import { expect, assert} from 'chai'
import {getMockedTask, getStubbedTask} from "./utils";

const proxyquire = require('proxyquire').noCallThru()

describe('Task Service tests', () => {
    const mockedId = uuid()
    const mockedContent = {
        title: 'mockedTask',
        notes: 'this task is mocked'
    }

    let mockedModel
    let service

    beforeEach(() => {
        mockedModel = getStubbedTask({_id: mockedId})
        service = proxyquire('../../src/services/management/TaskService.js', {
            'db/models/management/Task': mockedModel,
        })
    })

    it('fetchTaskById() - if found returns matching task', done => {
        const mockedTask = getMockedTask({
            _id: mockedId,
        })

        mockedModel
            .expects('findById')
            .withArgs(mockedId)
            .resolves(mockedTask)

        service.fetchTaskById(mockedId).then(task => {
            assert.isNotNull(task)

            expect(task).to.equal(mockedTask)
            mockedModel.verify()
            done()
        })

    })

    it('fetchTaskById() - if not found returns null', done => {
        mockedModel
            .expects('findById')
            .withArgs(mockedId)
            .resolves(null)

        service.fetchTaskById(mockedId).then(task => {
            assert.isNull(task)

            done()
        })
    })

    it('createTask() - returns Task with proper content', done => {
        service.createTask(mockedContent).then(task => {
            assert.isNotNull(task)

            expect(task)
                .to.have.property('title')
                .equal(mockedContent.title)
            expect(task)
                .to.have.property('notes')
                .equal(mockedContent.notes)
            done()
        })
    })
})