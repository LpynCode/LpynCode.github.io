import { useEffect } from 'react'
import styles from './Timer.module.css'
import { TimerProps } from './Timer.props'
export const Timer = ({seconds, setSeconds, stop}: TimerProps) => {

    useEffect(() => {
        if(seconds <= 0) return stop()
        const interval = setInterval(() => {
            setSeconds(seconds - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [seconds])

    return (
        <div className={styles.timer}>
            {seconds}
        </div>
    )
}