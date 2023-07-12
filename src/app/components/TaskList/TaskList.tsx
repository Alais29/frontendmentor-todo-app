import React from 'react'
import { ItaskAdapter } from '../../../ports/ITaskAdapter'
import { ITaskWitId } from '../../../common/interfaces'
import classnames from 'classnames/bind'
import styles from './tasklist.module.scss'
import { TaskItem } from '../TaskItem/TaskItem'

const cx = classnames.bind(styles)

interface ITaskList {
  tasks: ITaskWitId[]
  taskAdapter: ItaskAdapter
  setTasks: React.Dispatch<React.SetStateAction<ITaskWitId[]>>
}

export const TaskList = ({ tasks, taskAdapter, setTasks }: ITaskList) => {
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
    <div className={cx('taskList')}>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}
