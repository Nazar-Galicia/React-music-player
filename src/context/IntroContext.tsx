import {createContext, type FC, type ReactNode, useEffect, useMemo, useState} from "react";

interface IntroContextProps {
    isIntro: string,
    startSite: boolean,
}

interface IntroProviderProps {
    children: ReactNode,
}

export const IntroContext = createContext<IntroContextProps | null>(null);

const IntroContextProvider: FC<IntroProviderProps> = (props) => {
    const {
        children,
    } = props

    const isIntro: string = localStorage.getItem('isIntro') || 'false'
    const [startSite, setStartSite] = useState<boolean>(false)

    const startIntro = (): void => {
        setStartSite(true)
        document.removeEventListener('click', startIntro)
    }

    useEffect(() => {
        if (isIntro === 'false') {
            document.addEventListener('click', startIntro)
        }

        return () => document.removeEventListener('click', startIntro)
    }, [])

    interface IntroContextData {
        isIntro: string,
        startSite: boolean,
    }

    const value: IntroContextData = useMemo(() => {
        return {
            isIntro,
            startSite,
        }
    }, [
        isIntro,
        startSite,
    ])

    return (
        <IntroContext.Provider value={value}>
            {children}
        </IntroContext.Provider>
    )
}

export default IntroContextProvider