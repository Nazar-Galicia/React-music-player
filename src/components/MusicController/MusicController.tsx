import type {FC} from "react";

const MusicController: FC = () => {
    return (
        <div className="music-controller">
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