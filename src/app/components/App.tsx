import { useEffect, useState } from 'react'
import { TaskAdapter } from '../../adapters/services/TaskAdapter'
import { LocalStorageTasksRepository } from '../../adapters/repositories/LocalStorageTasksRepository'
import { ITaskWitId } from '../../common/interfaces'
import { Layout } from './Layout/Layout'
import { Title } from './Title/Title'
import { Input } from './Input/Input'

export const App = () => {
  const [task, setTask] = useState({
    title: '',
    completed: false,
  })
  const [tasks, setTasks] = useState<ITaskWitId[]>([])
  const taskAdapter = new TaskAdapter(new LocalStorageTasksRepository())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setTask({
      ...task,
      [e.target.name]: inputValue,
    })
  }

  useEffect(() => {
    taskAdapter.getTasks().then((apiTasks) => setTasks(apiTasks))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask = await taskAdapter.createTask(task)
    setTasks([...tasks, newTask])
    setTask({
      title: '',
      completed: false,
    })
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
    <Layout>
      <Title title={'TODO'} />
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='add new task'
          inputValue={task.title}
          inputName={'title'}
          showCheckbox
          checkboxValue={task.completed}
          checkboxName='completed'
          onChange={handleChange}
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
    </Layout>
  )
}
