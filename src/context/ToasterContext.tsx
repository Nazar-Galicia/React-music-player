import {createContext, type FC, type ReactNode, useMemo} from "react";

interface ToasterProviderProps {
    children: ReactNode,
}

interface ToasterData {}

export const ToasterContext = createContext<ToasterData | null>(null);

const ToasterProvider: FC<ToasterProviderProps> = (props) => {
    const {
        children,
    } = props

    const value: ToasterData | null = useMemo(() => {
        return {}
    }, [])

    return (
        <ToasterContext.Provider value={value}>
            {children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider;