import type {FC} from "react";
import './TrackCard.css'

interface TrackCardProps {
    image: string,
    title: string,
    artist: string,
    duration: number,
}

const TrackCard: FC<TrackCardProps> = (props) => {
    const {
        image,
        title,
        artist,
        duration,
    } = props

    return (
        <li className="music-card">
            <img
                className="music-card__cover"
                src={image}
                alt="Album cover"
            />

            <div className="music-card__info">
                <h3 className="music-card__title">{title}</h3>
                <p className="music-card__artist">{artist}</p>
            </div>

            <span className="music-card__duration">{duration}</span>

            <button className="music-card__play" aria-label="Play">
                <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </button>
        </li>
    )
}

export default TrackCard;