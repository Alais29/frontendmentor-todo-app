import React from 'react'
import { ITaskWitId } from '../../../common/interfaces'
import classnames from 'classnames/bind'
import styles from './taskitem.module.scss'
import { Checkbox } from '../Checkbox/Checkbox'
import crossImg from '../../../assets/images/icon-cross.svg'

const cx = classnames.bind(styles)

interface ITaskItem {
  task: ITaskWitId
  onToggle: (id: string) => void
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void
}

export const TaskItem = ({ task, onToggle, onDelete }: ITaskItem) => {
  return (
    <li
      key={task.id}
      className={cx('taskItem')}
      onClick={() => onToggle(task.id)}
    >
      <div className={cx('taskItemContent')}>
        <Checkbox checked={task.completed} name={`task-${task.id}`} />
        <span className={cx('taskItemTitle', { active: task.completed })}>
          {task.title}
        </span>
      </div>
      <button
        className={cx('taskItemDeleteBtn')}
        type='button'
        onClick={(e) => onDelete(e, task.id)}
      >
        <img src={crossImg} alt='Cross icon to delete task' />
      </button>
    </li>
  )
}
