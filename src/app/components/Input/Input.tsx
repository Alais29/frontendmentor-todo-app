import classnames from 'classnames/bind'
import styles from './input.module.scss'
import { Checkbox } from '../Checkbox/Checkbox'

const cx = classnames.bind(styles)

interface IInputCommonProps {
  placeholder: string
  inputValue: string
  inputName: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type IInputConditionalProps =
  | {
      showCheckbox?: undefined | false
      checkboxValue?: never
      checkboxName?: never
    }
  | {
      showCheckbox?: true
      checkboxValue: boolean
      checkboxName: string
    }

type IInput = IInputCommonProps & IInputConditionalProps

export const Input = ({
  placeholder,
  inputValue,
  inputName,
  showCheckbox,
  checkboxName,
  checkboxValue,
  onChange,
}: IInput) => {
  return (
    <div className={cx('inputContainer')}>
      {showCheckbox && (
        <Checkbox
          onChange={onChange}
          name={checkboxName}
          checked={checkboxValue}
        />
      )}
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
