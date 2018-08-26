import {fetchAllTasks, fetchTaskById} from '../../../../services/management/TaskService'

export let mockedTasks = [
    {
        id: 'id-1',
        title: 'test task',
        notes: 'we testin',
        date: null,
        deadline: null,
        completed: false,
        archived: false,
    }
]

const getTask = async (root, args) => {
    return fetchTaskById(args.id)
}

const getTasks = async () => {
    return fetchAllTasks()
}
export default {
    task: getTask,
    tasks: getTasks,
}



