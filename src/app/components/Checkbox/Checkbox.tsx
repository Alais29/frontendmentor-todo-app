import classnames from 'classnames/bind'
import styles from './checkbox.module.scss'

const cx = classnames.bind(styles)

interface ICheckbox {
  checked: boolean
  name: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
  checked,
  onChange = () => {
    return
  },
  name,
}: ICheckbox) => {
  return (
    <div className={cx('checkboxContainer')}>
      <div className={cx('checkboxMark', { active: checked })}>
        <div className={cx('checkboxBackground', { fill: checked })}></div>
      </div>
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
