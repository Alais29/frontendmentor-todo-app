import classnames from 'classnames/bind'
import styles from './title.module.scss'
import Moon from '../../../assets/images/icon-moon.svg'

const cx = classnames.bind(styles)

interface ITitle {
  title: string
}

export const Title = ({ title }: ITitle) => {
  return (
    <div className={cx('title')}>
      <h1 className={cx('title__text')}>{title}</h1>
      <img src={Moon} alt='Dark Mode' />
    </div>
  )
}
