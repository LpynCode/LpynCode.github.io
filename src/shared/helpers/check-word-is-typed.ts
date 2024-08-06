import { IWord } from "../models/word.interface"


export const checkWordIsTyped = (word: IWord): boolean => {
    for(const letter of word.letters) {
        if(!letter.isTyped) return false
    }
    return true
}