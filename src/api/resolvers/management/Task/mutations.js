import {createTask} from '../../../../services/management/TaskService'

const mutationTask = async (root, args) => {
    const task = {
        title: args.title,
        time: args.time,
        notes: args.notes,
        date: args.date,
        deadline: args.deadline
    }

    return await createTask(task)
}

export default {
    createTask: mutationTask,
}