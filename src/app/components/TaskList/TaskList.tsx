import React from 'react'
import { ITaskWitId } from '../../../common/interfaces'
import { TaskItem } from '../TaskItem/TaskItem'
import { ListFooter } from '../ListFooter/ListFooter'
import classnames from 'classnames/bind'
import styles from './tasklist.module.scss'

const cx = classnames.bind(styles)

interface ITaskList {
  tasks: ITaskWitId[]
  filter: 'all' | 'completed' | 'active'
  setFilter: React.Dispatch<
    React.SetStateAction<'all' | 'completed' | 'active'>
  >
  handleToggle: (taskId: string) => void
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, taskId: string) => void
  handleFilter: (filterOption: 'all' | 'completed' | 'active') => void
  handleClearCompleted: () => void
}

export const TaskList = ({
  tasks,
  handleToggle,
  handleDelete,
  filter,
  setFilter,
  handleClearCompleted,
}: ITaskList) => {
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
      <ListFooter
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        handleClearCompleted={handleClearCompleted}
      />
    </div>
  )
}
