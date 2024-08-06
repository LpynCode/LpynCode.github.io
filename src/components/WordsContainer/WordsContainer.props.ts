import { HTMLAttributes } from "react";
import { IWord } from "../../shared/models/word.interface";

export interface WordsContainerProps extends HTMLAttributes<HTMLDivElement> {
    words: IWord[]
}