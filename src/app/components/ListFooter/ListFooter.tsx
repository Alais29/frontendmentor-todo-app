import classnames from 'classnames/bind'
import styles from './listfooter.module.scss'
import { ITaskWitId } from '../../../common/interfaces'

const cx = classnames.bind(styles)

interface IListFooter {
  tasks: ITaskWitId[]
  filter: 'all' | 'completed' | 'active'
  setFilter: React.Dispatch<
    React.SetStateAction<'all' | 'completed' | 'active'>
  >
  handleClearCompleted: () => void
}

export const ListFooter = ({
  tasks,
  filter,
  setFilter,
  handleClearCompleted,
}: IListFooter) => {
  const handleFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.value as 'all' | 'active' | 'completed'
    setFilter(selectedOption)
  }

  return (
    <div className={cx('listFooter')}>
      <p>{tasks.length} items left</p>
      <div className={cx('listFooterFilter')}>
        <input
          type='radio'
          name='filter'
          value='all'
          id='all'
          checked={filter === 'all'}
          onChange={handleFilterList}
        />
        <label htmlFor='all' className={cx({ active: filter === 'all' })}>
          All
        </label>

        <input
          type='radio'
          name='filter'
          value='active'
          id='active'
          checked={filter === 'active'}
          onChange={handleFilterList}
        />
        <label htmlFor='active' className={cx({ active: filter === 'active' })}>
          Active
        </label>

        <input
          type='radio'
          name='filter'
          value='completed'
          id='completed'
          checked={filter === 'completed'}
          onChange={handleFilterList}
        />
        <label
          htmlFor='completed'
          className={cx({ active: filter === 'completed' })}
        >
          Completed
        </label>
      </div>
      <button
        onClick={handleClearCompleted}
        className={cx('listFooterClearBtn')}
      >
        Clear completed
      </button>
    </div>
  )
}
