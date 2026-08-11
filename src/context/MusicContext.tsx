import {createContext, type FC, type ReactNode, useMemo} from "react";

interface MusicContextProps {}

interface MusicProviderProps {
    children: ReactNode,
}

export const MusicContext = createContext<MusicContextProps | null>(null);

const MusicContextProvider: FC<MusicProviderProps> = (props) => {
    const {
        children,
    } = props

    interface MusicContextData {}

    const value: MusicContextData = useMemo(() => {
        return {}
    }, [])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}

export default MusicContextProvider