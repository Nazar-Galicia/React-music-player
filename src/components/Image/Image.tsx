import type {FC} from "react";
import { useEffect, useState } from 'react';
import thumbnailPlaceholder from '@/assets/images/track-placeholder.png'

interface ImageProps {
    className?: string;
    src: string;
    alt?: string;
    errorHandler?: () => void;
}

const Image: FC<ImageProps> = (props) => {
    const {
        className,
        src,
        alt,
        errorHandler,
    } = props

    const [imageSrc, setImageSrc] = useState(thumbnailPlaceholder);

    useEffect(() => {
        setImageSrc(src || thumbnailPlaceholder);
    }, [src]);

    return (
        <img
            className={className}
            src={imageSrc}
            alt={alt}
            onError={() => {
                setImageSrc(thumbnailPlaceholder);

                if (errorHandler) {
                    errorHandler()
                }
            }}
        />
    )
}

export default Image