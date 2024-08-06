import styles from './RestartButton.module.css'
export const RestartButton = ({restart}: {restart: () => void}) => {
    return (
        <button className={styles.button} onClick={restart}>Restart</button>
    )
}