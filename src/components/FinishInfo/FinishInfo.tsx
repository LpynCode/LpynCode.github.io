import { useInfoStore } from '../../store/info.store'
import styles from './FinishInfo.module.css'

export const FinishInfo = () => {
    const {info} = useInfoStore()
    return (
        <div className={styles.content}>
            <h3 className={styles.error}>Count errors: {info.errors}</h3>
            <p className={styles.wpm}>WPM: {info.wpm}</p>
        </div>
    )
}