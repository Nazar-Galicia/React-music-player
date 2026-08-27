import {type FC} from "react";
import './MusicController.css'
import {useAudio} from "../../hooks/useAudio.ts";
import playIcon from '../../assets/icons/playAudio.svg'
import pauseIcon from '../../assets/icons/pauseAudio.svg'
import {formatSongTime} from "../../utils/formatSongTime.ts";

const MusicController: FC = () => {
    const {
        audio,
        duration,
        playAudio,
        restartAudio,
        songProgress,
        changeSongCurrentTime,
        changeVolume,
        controllerRef,
    } = useAudio()



    return (
        <>
            <div ref={controllerRef} className="music-controller active-controller">
                <div className="music-controller__timeline">
                    <span className="music-controller__time">{
                        audio.current ? formatSongTime(audio.current.currentTime) : '00:00'
                    }</span>

                    <input
                        className="music-controller__range"
                        type="range"
                        min="0"
                        max="100"
                        step="0.01"
                        value={songProgress}
                        onChange={changeSongCurrentTime}
                    />

                    <span className="music-controller__time">{formatSongTime(duration)}</span>
                </div>

                <div className="music-controller__controls">

                    <button
                        onClick={() => {
                            if (audio.current) {
                                audio.current.currentTime -= 10

                                if (audio.current.paused) {
                                    audio.current.play().then(() => {
                                        setIsPlaying(true)
                                    })
                                }
                            }
                        }}
                        className="music-controller__button music-controller__button--seek"
                    >
                        <span>↶</span>
                        <small>10</small>
                    </button>

                    <button onClick={playAudio} className="music-controller__button music-controller__button--play">
                        <img src={isPlaying ? pauseIcon : playIcon} alt=""/>
                    </button>

                    <button
                        onClick={() => {
                            if (audio.current) {
                                audio.current.currentTime += 10

                                if (audio.current.paused) {
                                    audio.current.play().then(() => {
                                        setIsPlaying(true)
                                    })
                                }
                            }
                        }}
                        className="music-controller__button music-controller__button--seek"
                    >
                        <span>↷</span>
                        <small>10</small>
                    </button>

                    <button onClick={restartAudio} className="music-controller__button music-controller__button--restart">
                        ↻
                    </button>

                    <div className="music-controller__volume">
                        <svg
                            className="music-controller__volume-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 9V15H8L13 19V5L8 9H4Z"
                                fill="currentColor"
                            />
                            <path
                                d="M16 9C17 10 17 14 16 15"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                            <path
                                d="M18.5 6.5C21 9 21 15 18.5 17.5"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                            />
                        </svg>

                        <input
                            className="music-controller__volume-range"
                            type="range"
                            min="0"
                            max="100"
                            value={songVolume}
                            onChange={changeVolume}
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div ref={bottomGradientRef} className="bottom-gradient active-gradient" />
        </>
    )
}

export default MusicController