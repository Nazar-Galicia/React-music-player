import {type FC, useEffect, useRef} from "react";
import './MusicBackgroundLine.css'

interface MusicBackgroundLineProps {
    lineObj: {
        id: string,
        brightness: number,
        fontSize: number,
        line: string,
        speedY: number,
        spX: number,
        spY: number,
    },
    removeLine(id: string): void,
}

const MusicBackgroundLine: FC<MusicBackgroundLineProps> = (props) => {
    const {
        lineObj,
        removeLine,
    } = props

    const {
        id,
        brightness,
        fontSize,
        line,
        speedY,
        spX,
        spY,
    } = lineObj

    const y = useRef(0)
    const lineRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        let frameId: number;

        const animate = () => {
            y.current += speedY * 0.05;

            if (y.current + spY > window.innerHeight + 100) {
                removeLine(id);
                return;
            }

            if (lineRef.current) {
                lineRef.current.style.transform =
                    `translate3d(0, ${y.current}px, 0)`;
            }

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [id, removeLine, speedY]);

    return (
        <span
            ref={lineRef}
            className='music-bacground-line'
            style={{
                fontSize: `${fontSize}px`,
                filter: `brightness(${brightness})`,
                left: `${spX}px`,
                top: `${spY}px`,
            }}
        >
            {line}
        </span>
    )
}

export default MusicBackgroundLine;