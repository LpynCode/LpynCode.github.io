

export interface IWord {
    letters: ILetter[]
    length: number
    extraLength: number
    isSuccess: boolean
    isTyped: boolean
}

export interface ILetter {
    letter: string
    isSuccess: boolean
    isExtra: boolean
    isTyped: boolean
}