import sinon from 'sinon'
import 'sinon-mongoose'
import {v4 as uuid} from 'uuid'
import { expect, assert} from 'chai'
import casual from 'casual'
import {getMockedTask, getStubbedTask} from "./utils";
import Task from "../../src/db/models/management/Task";

const proxyquire = require('proxyquire').noCallThru()

describe('Task Service tests', () => {
    const mockedId = uuid()
    const mockedContent = {
        title: casual.title,
        notes: casual.description,
    }

    let mockedModel
    let mockedStub
    let service
    let sandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        Task.prototype.save = sandbox.stub().returns(new Task({_id: mockedId}))
        mockedModel = sandbox.mock(Task)
        service = proxyquire('../../src/services/management/TaskService.js', {
            'db/models/management/Task': mockedModel,
        })
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('fetchTaskById', () => {

        it('should return matching task when found', done => {
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

        it('should return null if task was not found', done => {
            mockedModel
                .expects('findById')
                .withArgs(mockedId)
                .resolves(null)

            service.fetchTaskById(mockedId).then(task => {
                assert.isNull(task)

                done()
            })
        })

    })


    describe('createTask', () => {
        it('should return created Task with proper content', done => {
            service.createTask(mockedContent).then(task => {
                assert.isNotNull(task)

                expect(task)
                    .to.have.property('title')
                    .equal(mockedContent.title)
                expect(task)
                    .to.have.property('notes')
                    .equal(mockedContent.notes)
                expect(task)
                    .to.have.property('archived')
                    .equal(false)
                expect(task)
                    .to.have.property('completed')
                    .equal(false)
                done()
            })
        })

    })


    describe('removeTask', () => {
        it('should return removed Task if it was found', done => {
            const mockedTask = getMockedTask({
                _id: mockedId,
            })

            mockedModel
                .expects('findByIdAndRemove')
                .withArgs(mockedId)
                .resolves(mockedTask)

            service.removeTask(mockedId).then(task => {
                assert.isNotNull(task)
                console.log(mockedId)
                console.log(task)
                expect(task)
                    .to.have.property('id')
                    .equal(mockedId)
                mockedModel.verify()
                done()
            })
        })

        it('should return null if Task was not found', done => {
            mockedModel
                .expects('findByIdAndRemove')
                .withArgs(mockedId)
                .resolves(null)

            service.removeTask(mockedId).then(task => {
                assert.isNull(task)
                done()
            })

        })

    })

})