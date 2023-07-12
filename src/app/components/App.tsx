import { useEffect, useState } from 'react'
import { TaskAdapter } from '../../adapters/services/TaskAdapter'
import { LocalStorageTasksRepository } from '../../adapters/repositories/LocalStorageTasksRepository'
import { ITaskWitId } from '../../common/interfaces'
import { Layout } from './Layout/Layout'
import { Title } from './Title/Title'
import { Input } from './Input/Input'
import { TaskList } from './TaskList/TaskList'

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask = await taskAdapter.createTask(task)
    setTasks([...tasks, newTask])
    setTask({
      title: '',
      completed: false,
    })
  }

  useEffect(() => {
    taskAdapter.getTasks().then((apiTasks) => setTasks(apiTasks))
  }, [])

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
      <TaskList tasks={tasks} taskAdapter={taskAdapter} setTasks={setTasks} />
    </Layout>
  )
}
