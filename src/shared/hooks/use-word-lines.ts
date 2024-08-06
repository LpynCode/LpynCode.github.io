
interface UseWordLinesProps {
    text: string
    countLines: number
    fontWidthPX: number
    wordMarginPX: number
    containerPaddingPX: number

    totalWidthPX: number
}

export const useWordLines = ({text, fontWidthPX, wordMarginPX, containerPaddingPX, totalWidthPX}: UseWordLinesProps) => {
    const words = text.split(' ')
    const lines = []
    let line : string[]= []

    let lineLength = containerPaddingPX*2;

    for(const word of words) {
        const currentLineLength = word.length*fontWidthPX + wordMarginPX*2 + wordMarginPX
        lineLength += currentLineLength

        if(lineLength < totalWidthPX) {
            line.push(word)
        } else {
            lines.push(line)
            lineLength = containerPaddingPX*2 + currentLineLength
            line = [word]
        }
    }
    

    return lines
}