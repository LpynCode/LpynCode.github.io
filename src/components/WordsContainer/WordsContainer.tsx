import { WordsContainerProps } from "./WordsContainer.props"
import styles from "./WordsContainer.module.css"
import cn from "classnames"

export const WordsContainer = ({words, ...props}: WordsContainerProps) => {

    return (
        <div className={styles.words} {...props}>
            {words.map((word, index) => <div className={cn(styles.word, {[styles.word_error]: !word.isSuccess && word.isTyped})} key={index}>
                {word.letters.map(({letter, isSuccess, isTyped, isExtra}, index) => 
                    <span className={cn(styles.letter, {[styles.typed]: isTyped, [styles.letter_error]: !isSuccess, [styles.letter_extra]: isExtra})} key={index}>{letter}</span>
                )}
            </div>)}
        </div>
    )
}