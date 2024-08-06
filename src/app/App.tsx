import { GameContainer } from '../components/GameContainer/GameContainer';
import styles from './App.module.css';

export const App = () => {


    return (
        <div className={styles.app}>
            <GameContainer/>
        </div>
    )
}