import {type FC, useEffect} from "react";

interface TracksListProps {
    query: string;
}

const TracksList: FC<TracksListProps> = (props) => {
    const {
        query,
    } = props

    return (
        <div className='tracks-list'></div>
    )
}

export default TracksList