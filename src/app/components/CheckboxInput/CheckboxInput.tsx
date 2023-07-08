import classnames from 'classnames/bind'
import styles from './checkboxInput.module.scss'

const cx = classnames.bind(styles)

interface IInput {
  placeholder: string
  inputValue: string
  inputName: string
  checkboxValue: boolean
  checkboxName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  placeholder,
  inputValue,
  inputName,
  checkboxValue,
  checkboxName,
  onChange,
}: IInput) => {
  return (
    <div className={cx('inputContainer')}>
      <div className={cx('checkboxContainer')}>
        <div className={cx('checkboxMark', { active: checkboxValue })}></div>
        <input
          type='checkbox'
          checked={checkboxValue}
          onChange={onChange}
          name={checkboxName}
          className={cx('checkbox')}
        />
      </div>
      <input
        type='text'
        value={inputValue}
        placeholder={placeholder}
        onChange={onChange}
        name={inputName}
        className={cx('textinput')}
      />
    </div>
  )
}
