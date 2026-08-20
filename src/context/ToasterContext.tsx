import {createContext, type FC, type ReactNode, type RefObject, useCallback, useMemo, useRef} from "react";

interface ToasterProviderProps {
    children: ReactNode,
}

interface ToasterData {
    toasterRef: RefObject<HTMLDivElement | null>,
    showMessage: (message: string, delay?: number) => void
}

export const ToasterContext = createContext<ToasterData | null>(null);

const ToasterProvider: FC<ToasterProviderProps> = (props) => {
    const {
        children,
    } = props

    const toasterRef = useRef<HTMLDivElement | null>(null)

    const showMessage = useCallback((message: string, delay: number = 1000): void => {
        if (toasterRef.current) {
            toasterRef.current.classList.add('active')

            console.log(message)

            setTimeout(() => {
                toasterRef.current && toasterRef.current.classList.remove('active')
            }, delay)
        }
    }, [])

    const value: ToasterData = useMemo(() => {
        return {
            toasterRef,
            showMessage,
        }
    }, [
        toasterRef,
        showMessage,
    ])

    return (
        <ToasterContext.Provider value={value}>
            {children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider;