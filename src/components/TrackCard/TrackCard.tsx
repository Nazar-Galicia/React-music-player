import {type FC} from "react";
import './TrackCard.css'
import {useNavigate} from "react-router-dom";

interface TrackCardProps {
    image: string,
    title: string,
    artist: string,
    duration: number,
    stream: {url: string}
}

const TrackCard: FC<TrackCardProps> = (props) => {
    const {
        image,
        title,
        artist,
        duration,
        stream,
    } = props

    const navigate = useNavigate()

    return (
        <li
            className="music-card"
            onClick={() => {
                navigate(`/lyrics/${artist}/${title}`, {
                    state: {
                        audioUrl: stream.url
                    }
                })
            }}
        >
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
        </li>
    )
}

export default TrackCard;