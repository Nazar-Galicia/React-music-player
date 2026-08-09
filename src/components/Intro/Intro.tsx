import {type FC, useEffect, useRef} from "react";

interface IntroProps {
    isStartSite: boolean;
    isIntro: string,
}

const Intro: FC<IntroProps> = (props) => {
    const {
        isStartSite,
        isIntro,
    } = props

    const listenRef = useRef<HTMLSpanElement | null>(null)
    const everywhereRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        if (isStartSite === true && isIntro === 'false') {
            setTimeout(() => {
                listenRef.current?.classList.remove('intro-word-hidden')

                setTimeout(() => {
                    everywhereRef.current?.classList.remove('intro-word-hidden')

                    setTimeout(() => {
                        listenRef.current?.classList.add('intro-word-hidden')
                        everywhereRef.current?.classList.add('intro-word-hidden')

                        localStorage.setItem('isIntro', 'true')
                    }, 1750)
                }, 2000)
            }, 750)
        }
    }, [isStartSite])

    return (
        <p className='intro-title'>
            <span ref={listenRef} className='intro-listen intro-word-hidden'>Listen.</span>
            <span ref={everywhereRef} className='intro-everywhere intro-word-hidden'>Everywhere.</span>
        </p>
    )
}

export default Intro