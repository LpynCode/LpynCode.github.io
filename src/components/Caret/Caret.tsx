import { HTMLAttributes } from 'react'
import styles from './Caret.module.css'

export const Caret = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={styles.caret} {...props}/>
    )
}