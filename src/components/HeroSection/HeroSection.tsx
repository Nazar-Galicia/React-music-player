import {type FC, useEffect, useRef, useState} from "react";
import SearchInput from "../SearchInput/SearchInput.tsx";
import './HeroSection.css'
import {Typewriter} from "react-simple-typewriter";
import TracksList from "../TracksList/TracksList.tsx";

interface HeroSectionProps {
    isIntro: string,
    startSite: boolean,
}

const HeroSection: FC<HeroSectionProps> = (props) => {
    const {
        isIntro,
        startSite,
    } = props

    const heroRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isIntro === 'false' && startSite === true) {
            setTimeout(() => {
                heroRef.current?.classList.remove('hero-section-hidden')
            }, 7000)
        }
    }, [startSite])

    const [inputQuery, setInputQuery] = useState<string>('')

    return (
        <main ref={heroRef} className={`hero-section ${isIntro === 'false' ? 'hero-section-hidden' : null}`}>
            <h1 className='hero-heading'>
                <Typewriter
                    words={[
                        'Search everything...',
                        'Listen. Watch. Think.',
                        'Be with yourself',
                        'Feel best feelings',
                        'Everything in your hands'
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={40}
                    deleteSpeed={100}
                    delaySpeed={8000}
                />
            </h1>

            <div className='search-container'>
                <SearchInput setValue={setInputQuery} />
                <TracksList query={inputQuery} />
            </div>
        </main>
    )
}

export default HeroSection