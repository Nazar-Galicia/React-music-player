import type {FC} from "react";
import './Toast.css'
import {useToaster} from "../../hooks/useToaster.ts";

const Toast: FC = () => {
    const { toasterRef, toasterRetryButtonRef, toasterMessage } = useToaster()

    return (
        <div ref={toasterRef} className='toast'>
            <p className='toast__meassgae'>{toasterMessage}</p>
            <button ref={toasterRetryButtonRef} className='toast__retry-button'>Retry</button>
        </div>
    )
}

export default Toast;