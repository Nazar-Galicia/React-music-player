import type {FC} from "react";
import './Toast.css'
import {useToaster} from "../../hooks/useToaster.ts";

const Toast: FC = () => {
    const { toasterRef } = useToaster()

    return (
        <div ref={toasterRef} className='toast'>
            <p className='toast__meassgae'>Error</p>
            <button className='toast__retry-button'>Retry</button>
        </div>
    )
}

export default Toast;