import { ChangeEvent, ForwardedRef, forwardRef, useEffect, useState } from 'react'
import styles from './TypingInput.module.css'
import { TypingInputProps } from './TypingInput.props'

export const TypingInput = forwardRef(({handleChange, ...props}: TypingInputProps, ref?: ForwardedRef<HTMLInputElement>) => {
    const [value, setValue] = useState('')
    const [lastLetter, setLastLetter] = useState({letter: ''})

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const str = event.target.value
        setValue((prev) => {
            if(prev.length > str.length) {
                setLastLetter({letter: 'Backspace'})
            } else {
                setLastLetter({letter: str.slice(-1)})
            }
            return str
        })
    }

    useEffect(() => {
        if(!lastLetter.letter) return
        handleChange(lastLetter.letter)
    }, [lastLetter])

    return (
        <input ref={ref} onChange={onChange} value={value} className={styles.input} tabIndex={0} {...props}/>
    )
})