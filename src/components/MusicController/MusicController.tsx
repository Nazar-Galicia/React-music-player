import {type FC, useEffect, useRef} from "react";
import './MusicController.css'

const MusicController: FC = () => {
    let hideTimer: number;
    const controllerRef = useRef<HTMLDivElement | null>(null)

    const mouseMoveHandler = (event: MouseEvent) => {
        const mouseY = event.clientY
        clearTimeout(hideTimer)

        if (mouseY >= 700) {
            controllerRef.current && controllerRef.current.classList.add('active')
        } else {
            hideTimer = setTimeout(() => {
                controllerRef.current && controllerRef.current.classList.remove('active')
            }, 600)
        }
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler)

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, []);

    return (
        <div ref={controllerRef} className="music-controller">
            <div className="music-controller__timeline">
                <span className="music-controller__time">0:00</span>

                <input
                    className="music-controller__range"
                    type="range"
                    min="0"
                    max="100"
                    value="35"
                    readOnly
                />

                <span className="music-controller__time">3:42</span>
            </div>

            <div className="music-controller__controls">

                <button className="music-controller__button music-controller__button--seek">
                    <span>↶</span>
                    <small>10</small>
                </button>

                <button className="music-controller__button music-controller__button--play">
                    ▶
                </button>

                <button className="music-controller__button music-controller__button--seek">
                    <span>↷</span>
                    <small>10</small>
                </button>

                <button className="music-controller__button music-controller__button--restart">
                    ↻
                </button>

            </div>
        </div>
    )
}

export default MusicController