import classnames from 'classnames/bind'
import styles from './listfooterFilter.module.scss'

const cx = classnames.bind(styles)

interface IListFooterFilter {
  filter: string
  handleFilterList: (e: React.ChangeEvent<HTMLInputElement>) => void
  view: 'desktop' | 'mobile'
}

export const ListFooterFilter = ({
  filter,
  handleFilterList,
  view,
}: IListFooterFilter) => {
  return (
    <div className={cx('listFooterFilter', view)}>
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
  )
}
