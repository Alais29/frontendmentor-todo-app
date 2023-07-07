import classnames from 'classnames/bind'
import styles from './layout.module.scss'

const cx = classnames.bind(styles)

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx('layout')}>
      <div className={cx('layout__header')} />
      <div className={cx('layout__content')}>{children}</div>
    </div>
  )
}
