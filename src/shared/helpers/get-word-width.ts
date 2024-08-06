import { IWord } from "../models/word.interface";


export const getWordWidth = (word: IWord, fontWidthPX: number, wordMarginPX: number) => {
    return word.length*fontWidthPX + wordMarginPX*2
}