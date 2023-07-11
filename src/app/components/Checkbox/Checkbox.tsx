import classnames from 'classnames/bind'
import styles from './checkbox.module.scss'

const cx = classnames.bind(styles)

interface ICheckbox {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const Checkbox = ({ checked, onChange, name }: ICheckbox) => {
  return (
    <div className={cx('checkboxContainer')}>
      <div className={cx('checkboxMark', { active: checked })}></div>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        name={name}
        className={cx('checkbox')}
      />
    </div>
  )
}
