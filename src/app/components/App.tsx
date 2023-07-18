import { useEffect, useState } from 'react'
import { TaskAdapter } from '../../adapters/services/TaskAdapter'
import { LocalStorageTasksRepository } from '../../adapters/repositories/LocalStorageTasksRepository'
import { ITaskWitId } from '../../common/interfaces'
import { Layout } from './Layout/Layout'
import { Title } from './Title/Title'
import { Input } from './Input/Input'
import { TaskList } from './TaskList/TaskList'
import classnames from 'classnames/bind'
import styles from './app.module.scss'

const cx = classnames.bind(styles)

export const App = () => {
  const [task, setTask] = useState({
    title: '',
    completed: false,
  })
  const [tasks, setTasks] = useState<ITaskWitId[]>([])
  const [filteredTasks, setFilteredTasks] = useState([...tasks])
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all')
  const [showError, setShowError] = useState(false)
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

    if (task.title === '') {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

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

  const handleFilter = (filterOption: 'all' | 'completed' | 'active') => {
    if (filterOption === 'all') {
      setFilteredTasks([...tasks])
    } else if (filterOption === 'completed') {
      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => task.completed),
      )
    } else if (filterOption === 'active') {
      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => !task.completed),
      )
    }
  }

  const handleClearCompleted = async () => {
    const updatedTasks = tasks.filter((task) => !task.completed)

    const completedTasks = tasks
      .filter((task) => task.completed)
      .map((task) => task.id)

    await taskAdapter.deleteCompleted(completedTasks)

    setTasks(updatedTasks)
  }

  useEffect(() => {
    taskAdapter.getTasks().then((apiTasks) => {
      setTasks(apiTasks)
      setFilteredTasks(apiTasks)
    })
  }, [])

  useEffect(() => {
    setFilteredTasks([...tasks])
    handleFilter(filter)
  }, [tasks, setFilteredTasks, filter])

  return (
    <Layout>
      <Title title={'TODO'} />
      <form onSubmit={handleSubmit} className={cx('form')}>
        {showError && (
          <p className={cx('emptyInputError')}>Please enter a task</p>
        )}
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
      <TaskList
        tasks={filteredTasks}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        handleFilter={handleFilter}
        filter={filter}
        setFilter={setFilter}
        handleClearCompleted={handleClearCompleted}
      />
    </Layout>
  )
}
