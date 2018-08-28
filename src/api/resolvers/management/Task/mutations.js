import {createTask, removeTask, updateTask} from '../../../../services/management/TaskService'

const createNewTask = async (root, {title, time, notes, date, deadline}) => {
    const task = {title, time, notes, date, deadline }

    return await createTask(task)
}

const removeTaskById = async (root, {id}) => {
    return await removeTask(id)
}

const editTask = async (root, {id, title, time, notes, date, deadline, completed, archived}) => {
    const passedTask = {title, time, notes, date, deadline, completed, archived}
    const finalTask = createTaskObject(passedTask)
    return await updateTask(id, finalTask)
}


const createTaskObject = ({title, time, notes, date, deadline, completed, archived}) => {
    let task = {}
    if (title !== undefined)
        task = {...task, title}
    if(time !== undefined)
        task = {...task, time}
    if(notes !== undefined)
        task = {...task, notes}
    if(date !== undefined)
        task = {...task, date}
    if(deadline !== undefined)
        task = {...task, deadline}
    if(completed !== undefined)
        task = {...task, completed}
    if(archived !== undefined)
        task = {...task, archived}
    return task
}
export default {
    createTask: createNewTask,
    removeTask: removeTaskById,
    editTask: editTask
}