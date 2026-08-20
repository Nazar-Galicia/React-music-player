import {createContext, type FC, type ReactNode, type RefObject, useCallback, useMemo, useRef, useState} from "react";

interface ToasterProviderProps {
    children: ReactNode,
}

interface ToasterData {
    toasterRef: RefObject<HTMLDivElement | null>,
    showMessage: (message: string, retryHandler?: () => void, delay?: number) => void,
    toasterRetryButtonRef: RefObject<HTMLButtonElement | null>,
    toasterMessage: string,
}

export const ToasterContext = createContext<ToasterData | null>(null);

const ToasterProvider: FC<ToasterProviderProps> = (props) => {
    const {
        children,
    } = props

    const toasterRef = useRef<HTMLDivElement | null>(null)
    const toasterRetryButtonRef = useRef<HTMLButtonElement | null>(null)
    const [toasterMessage, setToasterMessage] = useState<string>('')

    const showMessage = useCallback((message: string, retryHandler?: () => void, delay: number = 1000): void => {
        if (toasterRef.current) {
            toasterRef.current.classList.add('active')

            if (retryHandler && toasterRetryButtonRef.current) {
                toasterRetryButtonRef.current.onclick = () => {
                    retryHandler()
                    toasterRef.current && toasterRef.current.classList.remove('active')
                }
            } else {
                setTimeout(() => {
                    toasterRef.current && toasterRef.current.classList.remove('active')
                }, delay)
            }

            setToasterMessage(message)
        }
    }, [])

    const value: ToasterData = useMemo(() => {
        return {
            toasterRef,
            showMessage,
            toasterRetryButtonRef,
            toasterMessage,
        }
    }, [
        toasterRef,
        showMessage,
        toasterRetryButtonRef,
        toasterMessage,
    ])

    return (
        <ToasterContext.Provider value={value}>
            {children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider;