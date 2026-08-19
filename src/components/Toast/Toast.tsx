import type {FC} from "react";
import './Toast.css'

const Toast: FC = () => {
    return (
        <div className='toast'>
            <p className='toast__meassgae'>Error</p>
            <button className='toast__retry-button'>Retry</button>
        </div>
    )
}

export default Toast;