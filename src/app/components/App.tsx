import './App.css'
import { useEffect, useState } from 'react'
import { TaskAdapter } from '../../adapters/services/TaskAdapter'
import { LocalStorageTasksRepository } from '../../adapters/repositories/LocalStorageTasksRepository'
import { ITaskWitId } from '../../common/interfaces'

export const App = () => {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState<ITaskWitId[]>([])
  const taskAdapter = new TaskAdapter(new LocalStorageTasksRepository())

  useEffect(() => {
    taskAdapter.getTasks().then((apiTasks) => setTasks(apiTasks))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask = await taskAdapter.createTask({
      title: taskInput,
      completed: false,
    })
    setTasks([...tasks, newTask])
  }

  const handleToggle = async (taskId: string) => {
    const taskToUpdate = tasks.findIndex((task) => task.id === taskId)

    const updatedTasks = [...tasks]
    updatedTasks[taskToUpdate].toggle()
    await taskAdapter.updateTask(taskId, {
      completed: updatedTasks[taskToUpdate].completed,
    })

    setTasks(updatedTasks)
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    taskId: string,
  ) => {
    e.stopPropagation()

    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    await taskAdapter.deleteTask(taskId)
    setTasks(updatedTasks)
  }

  return (
    <>
      <h1>TODO ✨</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='add new task'
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleToggle(task.id)}>
            {task.title} {task.completed ? '✅' : 'X'}
            <button onClick={(e) => handleDelete(e, task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
