import { create } from "zustand";

interface ITextStore {
    text: string;
    fetchText: () => Promise<void>;
}

export const useTextStore = create<ITextStore>(set => ({
    text: '',
    async fetchText() {
        try {
            const response = await fetch('https://fish-text.ru/get?number=5');
            const {text} = await response.json();
            set({ text });
        } catch(e) {
            console.error(e);
        }
    }
}))