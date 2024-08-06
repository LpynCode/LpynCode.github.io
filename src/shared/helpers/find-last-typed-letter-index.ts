import { IWord } from "../models/word.interface"


export const findLastTypedLetterIndex = (word: IWord) => {

    for(let i = word.letters.length - 1; i >= 0; i--) {
        if(word.letters[i].isTyped) {
            return i
        }
    }
    return 0
}