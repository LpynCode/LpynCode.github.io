import { IWord } from "../models/word.interface";


export const getWordLines = (words: IWord[], fontWidthPX: number, wordMarginPX: number, containerPaddingPX: number, totalWidthPX: number) => {
    const lines: number[] = []

    let lineLength = containerPaddingPX*2;
    let currentLine = 0

    for(let i = 0; i < words.length; i++) {
        const word = words[i]
        const currentLineLength = word.length*fontWidthPX + wordMarginPX*2
        lineLength += currentLineLength
        if(!lines[currentLine]) lines[currentLine] = 0
        if(lineLength <= totalWidthPX) {
            lines[currentLine] += 1
        } else {
            currentLine += 1
            lines[currentLine] = 1
            lineLength = containerPaddingPX*2 + currentLineLength
        }

    }

    return lines
}