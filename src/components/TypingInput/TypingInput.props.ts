import { HTMLAttributes } from "react";

export interface TypingInputProps extends HTMLAttributes<HTMLInputElement> {
    handleChange: (letter: string) => void
}