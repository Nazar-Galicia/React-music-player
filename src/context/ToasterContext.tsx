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
    showMessage: (message: string, delay?: number, retryHandler?: () => void) => void,
    toasterRetryButtonRef: RefObject<HTMLButtonElement | null>,
    toasterMessage: string,
    isError: RefObject<boolean>
}

export const ToasterContext = createContext<ToasterData | null>(null);

const ToasterProvider: FC<ToasterProviderProps> = (props) => {
    const {
        children,
    } = props

    const toasterRef = useRef<HTMLDivElement | null>(null)
    const toasterRetryButtonRef = useRef<HTMLButtonElement | null>(null)
    const [toasterMessage, setToasterMessage] = useState<string>('')
    const isError= useRef<boolean>(false)

    const location = useLocation()

    const retryAttempts = useRef<number>(0);

    useEffect(() => {
        toasterRef.current && toasterRef.current.classList.remove('active')
        retryAttempts.current = 0
    }, [location]);

    const showMessage = useCallback((message: string, delay: number = 1000, retryHandler?: () => void): void => {
        if (toasterRef.current) {
            toasterRef.current.classList.add('active')
            toasterRetryButtonRef.current && toasterRetryButtonRef.current.classList.remove('hidden')

            if (retryHandler && toasterRetryButtonRef.current && isError.current) {
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
                isError.current = false
            }

            if (retryAttempts.current >= 3) {
                toasterRef.current && toasterRef.current.classList.remove('active')
                retryAttempts.current = 0;

                showMessage('cannot handle error', 3000)
                isError.current = false
            }

            setToasterMessage(message)
        }
    }, [isError])

    const value: ToasterData = useMemo(() => {
        return {
            toasterRef,
            showMessage,
            toasterRetryButtonRef,
            toasterMessage,
            isError,
        }
    }, [
        toasterRef,
        showMessage,
        toasterRetryButtonRef,
        toasterMessage,
        isError,
    ])

    return (
        <ToasterContext.Provider value={value}>
            {children}
        </ToasterContext.Provider>
    )
}

export default ToasterProvider;