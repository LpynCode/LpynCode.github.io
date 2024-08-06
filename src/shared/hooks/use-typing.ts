import { useCallback, useEffect, useMemo, useState } from "react"
import { IWord } from "../models/word.interface"
import { checkWordIsSuccess } from "../helpers/check-word-is-success"
import { findLastTypedLetterIndex } from "../helpers/find-last-typed-letter-index"
import { formatWords } from "../helpers/format-words"
import { flushSync } from "react-dom"
import { getWordLines } from "../helpers/get-word-lines"
import { checkWordIsTyped } from "../helpers/check-word-is-typed"

interface UseTypingProps {
    initialText: string
    fontWidthPX: number
    wordMarginPX: number
    padding: number
    windowWidth: number
}

export const useTyping = ({initialText, fontWidthPX, wordMarginPX, padding, windowWidth}: UseTypingProps) => {
    const [_initialText, _setInitialText] = useState<string>(initialText)
    const [wordsArray, setWordsArray] = useState<IWord[]>(formatWords(initialText))
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
    const [totalIndex, setTotalIndex] = useState<number>(0)
    const [lineIndex, setLineIndex] = useState<number>(0)
    const [wordInLine, setWordInLine] = useState<number>(0)
    const [errors, setErrors] = useState<number>(0)
    const [countWords, setCountWords] = useState<number>(0)

    useEffect(() => {
        _setInitialText(initialText)
        setWordsArray(formatWords(initialText))
        setCurrentWordIndex(0)
        setCurrentLetterIndex(0)
        setTotalIndex(0)
        setLineIndex(0)
        setWordInLine(0)
    }, [initialText])

    const lines = useMemo(() => getWordLines(wordsArray, fontWidthPX, wordMarginPX, padding, windowWidth), [fontWidthPX, padding, windowWidth, wordMarginPX, wordsArray])

    const _addLetter = useCallback((letter: string) => {
        const newArray = [...wordsArray]
        flushSync(() => {
            setCurrentLetterIndex((prev) => prev + 1)
        })
        setTotalIndex((prev) => prev + 1)

        // extra letter
        if(currentLetterIndex >= wordsArray[currentWordIndex].length) {
            newArray[currentWordIndex].letters.push({letter, isSuccess: false, isTyped: true, isExtra: true})
            newArray[currentWordIndex].extraLength += 1
            setWordsArray(newArray)
            setErrors((prev) => prev + 1)
            return
        }
        
        const currentLetter = wordsArray[currentWordIndex].letters[currentLetterIndex]
        newArray[currentWordIndex].letters[currentLetterIndex] = {letter: currentLetter.letter, isSuccess: letter === currentLetter.letter, isTyped: true, isExtra: false}
        if(letter !== currentLetter.letter) setErrors((prev) => prev + 1)
        setWordsArray(newArray)

    }, [currentWordIndex, currentLetterIndex, wordsArray])
    console.log(countWords)
    const _newWord = useCallback(() => {
        if(currentLetterIndex === 0 || currentWordIndex + 1 === wordsArray.length) return

        const newArray = [...wordsArray]
        newArray[currentWordIndex].isSuccess = checkWordIsSuccess(newArray[currentWordIndex])
        if(checkWordIsTyped(newArray[currentWordIndex])) setCountWords((prev) => prev + 1)
        newArray[currentWordIndex].isTyped = true
        setWordsArray(newArray)
        setCurrentWordIndex((prev) => prev + 1)
        const newTotalIndex = wordsArray.slice(lines.slice(0, lineIndex).reduce((acc, word) => acc + word, 0), currentWordIndex + 1).reduce((acc, word) => acc + word.length + word.extraLength, 0) + wordInLine + 1
        setTotalIndex(newTotalIndex)
        setCurrentLetterIndex(0)
        setWordInLine((prev) => {
            if(prev === lines[lineIndex] - 1) {
                setLineIndex((prev) => prev + 1)
                setTotalIndex(0)
                return 0
            }
            return prev + 1
        })
    }, [currentLetterIndex, wordsArray, wordInLine, currentWordIndex, lines, lineIndex])

    const _removeLetter = useCallback(() => {
        if(currentWordIndex === 0 && currentLetterIndex === 0) return

        // remove first letter
        if(currentLetterIndex === 0) {
            const lastTypedIndex = findLastTypedLetterIndex(wordsArray[currentWordIndex - 1]) + 1
            let totalLastTypedIndex = 0
            if(wordInLine === 0) {
                totalLastTypedIndex =  wordsArray.slice(0, currentWordIndex).reduce((acc, word) => acc + word.length + word.extraLength, 0) - (wordsArray[currentWordIndex-1].length + wordsArray[currentWordIndex-1].extraLength) + lastTypedIndex + lines[lineIndex - 1] - 1
                setLineIndex((prev) => prev - 1)
                setWordInLine(lines[lineIndex - 1] - 1)
            } else {
                totalLastTypedIndex = wordsArray.slice(lines.slice(0, lineIndex).reduce((acc, word) => acc + word, 0), currentWordIndex ).reduce((acc, word) => acc + word.length + word.extraLength, 0) - (wordsArray[currentWordIndex-1].length + wordsArray[currentWordIndex-1].extraLength) + lastTypedIndex + wordInLine - 1
                setWordInLine((prev) => prev - 1)
            }
            setCountWords((prev) => prev - 1)
            setTotalIndex(totalLastTypedIndex)
            setCurrentLetterIndex(lastTypedIndex)
            setCurrentWordIndex((prev) => prev - 1)
            return
        }
        const newArray = [...wordsArray]
        // remove extra letters
        if(currentLetterIndex >= wordsArray[currentWordIndex].length + wordsArray[currentWordIndex].extraLength && wordsArray[currentWordIndex].extraLength > 0) {
            newArray[currentWordIndex].extraLength -= 1
            newArray[currentWordIndex].letters.pop()
            setWordsArray(newArray)
            setTotalIndex((prev) => prev - 1)
            setCurrentLetterIndex((prev) => prev - 1)
            return
        }
        // remove letters
        newArray[currentWordIndex].letters[currentLetterIndex - 1].isSuccess = true
        newArray[currentWordIndex].letters[currentLetterIndex - 1].isTyped = false
        setWordsArray(newArray)
        setTotalIndex((prev) => prev - 1)
        setCurrentLetterIndex((prev) => prev - 1)
    }, [currentWordIndex, currentLetterIndex, wordsArray, wordInLine, lines, lineIndex])

    const handleLetter = useCallback((letter: string) => {
        if(!letter) return
        if(letter === 'Backspace') return _removeLetter()
        if(letter === ' ') return _newWord()

        _addLetter(letter)
    }, [_removeLetter, _newWord, _addLetter])

    const _removeFirstLine = () => {
        let newArray = [...wordsArray]
        newArray = newArray.slice(lines[0], newArray.length)
        setCurrentWordIndex(prev => prev - lines[0])
        setLineIndex(prev => prev - 1)
        setTotalIndex(0)
        setWordInLine(0)
        setWordsArray(newArray)
        _setInitialText(Array.from(_initialText.split(' ')).slice(lines[0]).join(' '))
        setCurrentLetterIndex(0)
    }

    useEffect(() => {
        if(lineIndex< 2) return;

        _removeFirstLine()
    }, [lineIndex])
    
    return {
        wordsArray,
        totalIndex,
        currentWordIndex,
        handleLetter,
        lineIndex,
        wordInLine,
        setLineIndex,
        errors,
        countWords
    }
}