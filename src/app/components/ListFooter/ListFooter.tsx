import classnames from 'classnames/bind'
import styles from './listfooter.module.scss'
import { ITaskWitId } from '../../../common/interfaces'
import { ListFooterFilter } from '../ListFooterFilter/ListFooterFilter'

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
      <ListFooterFilter
        filter={filter}
        handleFilterList={handleFilterList}
        view='desktop'
      />
      <button
        onClick={handleClearCompleted}
        className={cx('listFooterClearBtn')}
      >
        Clear completed
      </button>
    </div>
  )
}
