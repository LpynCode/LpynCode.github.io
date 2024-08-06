import { useEffect, useMemo, useRef, useState } from "react"
import { useTyping } from "../../shared/hooks/use-typing"
import { TypingInput } from "../TypingInput/TypingInput"
import { WordsContainer } from "../WordsContainer/WordsContainer"
import styles from "./GameContainer.module.css"
import { Caret } from "../Caret/Caret"
import useWindowSize from "../../shared/hooks/use-window-size"
import { RestartButton } from "../RestartButton/RestartButton"
import { useTextStore } from "../../store/text.store"
import { Timer } from "../Timer/Timer"
import { FinishInfo } from "../FinishInfo/FinishInfo"
import { useInfoStore } from "../../store/info.store"

export const GameContainer = () => {
    const {text, fetchText} = useTextStore()
    const {setInfo} = useInfoStore()
    const initialSeconds = 30
    const fontWidthPX = 19
    const padding = 5

    const countLines = 3; 
    const fontSizePX = 35;
    const wordMarginPX = 5;
    const caretHeightPX = 10;
    const {width: windowWidth} = useWindowSize(1440);

    const {handleLetter, wordsArray, totalIndex, lineIndex, wordInLine, errors, countWords} = useTyping({ initialText: text, fontWidthPX, wordMarginPX, padding, windowWidth})
    const [inputFocused, setInputFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const [stopped, setStopped] = useState(true)
    const [finished, setFinished] = useState(false)
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        fetchText()
    }, [])

    const [caretLeft, caretTop] = useMemo(() => {
        const XIndex = (totalIndex - wordInLine) * fontWidthPX + padding + wordMarginPX + wordInLine*wordMarginPX*2 + 'px'
        const YIndex = lineIndex*fontSizePX + padding + lineIndex*wordMarginPX*2 + caretHeightPX + 'px'
        return [XIndex, YIndex]
    }, [lineIndex, wordInLine, totalIndex])

    const height = useMemo(() => {
        const totalHeight = countLines*fontSizePX + padding*2 + (countLines)*wordMarginPX*2 + 'px'
        return totalHeight
    }, [countLines])

    const stopGame = () => {
        setStopped(true)
        setFinished(true)
        const wpm = Math.round(countWords * 60 / initialSeconds)
        setInfo({errors, wpm})
    }

    const restartGame = () => {
        setFinished(false)
        setSeconds(initialSeconds)
        fetchText()
    }

    const handleChange = (letter: string) => {
        console.log(letter)
        setStopped(false)
        handleLetter(letter)
    }

    const focusInput = () => {
        inputRef.current?.focus()
        setInputFocused(true)
    }
    const onBlur = () => {
        setInputFocused(false)
    }

    useEffect(() => {
        focusInput()
        window.addEventListener('keydown', focusInput)
        
        return () => window.removeEventListener('keydown', focusInput)
    }, [])

    return (
        <div className={styles.container} onClick={() => focusInput()} style={{padding}}>
                {!stopped && <Timer seconds={seconds} setSeconds={setSeconds} stop={stopGame}/>}
                {
                    text
                        ?
                    <>
                        {!finished
                            ?
                            <>
                                {inputFocused && <Caret style={{top: caretTop, left: caretLeft}}/>}
                                <WordsContainer words={wordsArray} style={{height}}/>
                                <TypingInput onBlur={() => onBlur()} ref={inputRef} handleChange={handleChange}/>
                            </>
                            :
                            <FinishInfo />
                        }
                        
                        <RestartButton restart={restartGame} />
                    </>
                        : 
                    <div className={styles.loading}>Подождите немного, текст уже загружается</div>
                
                }
        </div>
    )
}