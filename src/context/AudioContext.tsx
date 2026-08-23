import {createContext, type FC, type ReactNode, useMemo} from "react";

interface AudioProviderProps {
    children: ReactNode,
}

export const AudioContext = createContext<{} | null>(null);

const AudioContextProvider: FC<AudioProviderProps> = (props) => {
    const {
        children,
    } = props

    const value = useMemo(() => {
        return {}
    }, [])

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )
}

export default AudioContextProvider