import {
    createContext,
    type FC,
    type ReactNode,
    type RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {useLocation} from "react-router-dom";

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

    const location = useLocation()

    const retryAttempts = useRef<number>(0);

    useEffect(() => {
        toasterRef.current && toasterRef.current.classList.remove('active')
    }, [location]);

    const showMessage = useCallback((message: string, retryHandler?: () => void, delay: number = 1000): void => {
        if (toasterRef.current) {
            toasterRef.current.classList.add('active')
            toasterRetryButtonRef.current && toasterRetryButtonRef.current.classList.remove('hidden')

            if (retryHandler && toasterRetryButtonRef.current) {
                toasterRetryButtonRef.current.onclick = () => {
                    if (retryAttempts.current < 3) {
                        retryHandler()
                        toasterRef.current && toasterRef.current.classList.remove('active')
                        retryAttempts.current += 1;
                        console.log(retryAttempts.current)
                    }
                }
            } else {
                toasterRetryButtonRef.current && toasterRetryButtonRef.current.classList.add('hidden')
                setTimeout(() => {
                    toasterRef.current && toasterRef.current.classList.remove('active')
                }, delay)
            }

            if (retryAttempts.current >= 3) {
                toasterRef.current && toasterRef.current.classList.remove('active')
                retryAttempts.current = 0;

                showMessage('cannot handle error')
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