import classnames from 'classnames/bind'
import styles from './title.module.scss'
import Moon from '../../../assets/images/icon-moon.svg'
import Sun from '../../../assets/images/icon-sun.svg'
import useLocalStorage from 'use-local-storage'

const cx = classnames.bind(styles)

interface ITitle {
  title: string
  handleTheme: () => void
}

export const Title = ({ title, handleTheme }: ITitle) => {
  const [theme] = useLocalStorage<'dark' | 'light'>('theme', 'light')
  return (
    <div className={cx('title')}>
      <h1 className={cx('title__text')}>{title}</h1>
      <img
        src={theme === 'light' ? Moon : Sun}
        alt='Dark Mode'
        onClick={handleTheme}
      />
    </div>
  )
}
