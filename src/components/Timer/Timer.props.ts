

export interface TimerProps {
    seconds: number
    setSeconds: (seconds: number) => void
    stop: () => void
}