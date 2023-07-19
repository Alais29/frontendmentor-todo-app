import classnames from 'classnames/bind'
import styles from './layout.module.scss'
import useLocalStorage from 'use-local-storage'

const cx = classnames.bind(styles)

interface ILayout {
  children: React.ReactNode
}

export const Layout = ({ children }: ILayout) => {
  const [theme] = useLocalStorage<'dark' | 'light'>('theme', 'light')
  return (
    <div className={cx('layout')} data-theme={theme}>
      <div className={cx('layout__header')} />
      <div className={cx('layout__content')}>{children}</div>
    </div>
  )
}
