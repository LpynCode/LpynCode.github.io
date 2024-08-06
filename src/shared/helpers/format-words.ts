import { IWord } from "../models/word.interface"


export const formatWords = (text: string): IWord[] => {
    const words = text.split(' ').map((word) => ({letters: Array.from(word).map((letter) => ({letter, isSuccess: true,isExtra: false, isTyped: false})), extraLength: 0, length: word.length, isSuccess: false, isTyped: false}))
    words.pop()

    return words
}