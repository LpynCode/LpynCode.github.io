import { IWord } from "../models/word.interface"

export const checkWordIsSuccess = (word: IWord): boolean => {
    for(const letter of word.letters) {
        if(!letter.isSuccess || !letter.isTyped) return false
    }
    return true
}