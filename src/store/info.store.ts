import { create } from "zustand"

interface IInfoStore {
    info: {errors: number, wpm: number}
    setInfo: (info: {errors: number, wpm: number}) => void
}

export const useInfoStore = create<IInfoStore>(set => ({
    info: {errors: 0, wpm: 0},
    setInfo: (info: {errors: number, wpm: number}) => set({info})
}))

