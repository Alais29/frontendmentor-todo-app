import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import classnames from 'classnames/bind'
import { TaskAdapter } from '../../adapters/services/TaskAdapter'
import { LocalStorageTasksRepository } from '../../adapters/repositories/LocalStorageTasksRepository'
import { ITaskWitId } from '../../common/interfaces'
import { Layout } from './Layout/Layout'
import { Title } from './Title/Title'
import { Input } from './Input/Input'
import { TaskList } from './TaskList/TaskList'
import styles from './app.module.scss'
import { ListFooterFilter } from './ListFooterFilter/ListFooterFilter'

const cx = classnames.bind(styles)

type TaskFilter = 'all' | 'completed' | 'active'

export const App = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>(
    'theme',
    defaultDark ? 'dark' : 'light',
  )
  const [task, setTask] = useState({
    title: '',
    completed: false,
  })
  const [tasks, setTasks] = useState<ITaskWitId[]>([])
  const [filteredTasks, setFilteredTasks] = useState([...tasks])
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [showError, setShowError] = useState(false)

  const taskAdapter = new TaskAdapter(new LocalStorageTasksRepository())

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

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

  const handleFilter = (filterOption: TaskFilter) => {
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
      <Title title={'TODO'} handleTheme={switchTheme} />
      <form onSubmit={handleSubmit} className={cx('form')}>
        {showError && (
          <p className={cx('emptyInputError')}>Please enter a task</p>
        )}
        <Input
          placeholder='Create a new todo...'
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
      <ListFooterFilter
        filter={filter}
        handleFilterList={(e) => setFilter(e.target.value as TaskFilter)}
        view='mobile'
      />
    </Layout>
  )
}
