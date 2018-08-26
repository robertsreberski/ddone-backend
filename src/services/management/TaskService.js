import Task from 'db/models/management/Task'

export const fetchAllTasks = async () => {
    return await Task.find({})
}

export const fetchTaskById = async (id) => {
    try {
        return await Task.findById(id)
    }catch(e) {
      console.log(e)
      return null
    }
}

export const createTask = async ({title, time, notes, date, deadline}) => {
    const task = new Task({
        title,
        time,
        notes,
        date,
        deadline,
    })

    await task.save(err => {
        if(err) console.error(err)
    })

    return task
}