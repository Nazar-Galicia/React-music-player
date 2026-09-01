import {type FC, useRef} from "react";
import './TrackCard.css'
import {useNavigate} from "react-router-dom";
import {formatSongTime} from "../../utils/formatSongTime.ts";
import Image from '../../components/Image/Image'
import thumbnailPlaceholder from '@/assets/images/track-placeholder.png'

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

    const imageVar = useRef<string>(image)

    const navigate = useNavigate()

    return (
        <li
            className="music-card"
            onClick={() => {
                navigate(`/visualiser/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`, {
                    state: {
                        audioUrl: stream.url,
                        thumbnail: imageVar.current,
                        duration: duration,
                    }
                })
            }}
        >
            <Image
                className='music-card__cover'
                src={imageVar.current}
                alt={title}
                errorHandler={() => {
                    imageVar.current = thumbnailPlaceholder
                }}
            />

            <div className="music-card__info">
                <h3 className="music-card__title">{title}</h3>
                <p className="music-card__artist">{artist}</p>
            </div>

            <span className="music-card__duration">{formatSongTime(duration)}</span>
        </li>
    )
}

export default TrackCard;