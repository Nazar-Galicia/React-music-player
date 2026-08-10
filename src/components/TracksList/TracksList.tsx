import {type FC, useEffect, useState} from "react";
import {musicMetaAPI} from "../../api/musicMetaAPI.ts";
import './TrackList.css'

interface TracksListProps {
    query: string;
}

const TracksList: FC<TracksListProps> = (props) => {
    const {
        query,
    } = props

    const [tracks, setTracks] = useState(null)

    useEffect(() => {
        console.log(query)
        musicMetaAPI.getSongData(query).then(data => {
            setTracks(data)
        })
    }, [query]);

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    return (
        <ul className='tracks-list'>
            <li className="music-card">
                <img
                    className="music-card__cover"
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200"
                    alt="Album cover"
                />

                <div className="music-card__info">
                    <h3 className="music-card__title">Blinding Lights</h3>
                    <p className="music-card__artist">The Weeknd</p>
                </div>

                <span className="music-card__duration">3:20</span>

                <button className="music-card__play" aria-label="Play">
                    <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
            </li>
            <li className="music-card">
                <img
                    className="music-card__cover"
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200"
                    alt="Album cover"
                />

                <div className="music-card__info">
                    <h3 className="music-card__title">Blinding Lights</h3>
                    <p className="music-card__artist">The Weeknd</p>
                </div>

                <span className="music-card__duration">3:20</span>

                <button className="music-card__play" aria-label="Play">
                    <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
            </li>
        </ul>
    )
}

export default TracksList