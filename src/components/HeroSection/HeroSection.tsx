import {useContext, useEffect, useRef, useState} from "react";
import SearchInput from "../SearchInput/SearchInput.tsx";
import './HeroSection.css'
import {Typewriter} from "react-simple-typewriter";
import TracksList from "../TracksList/TracksList.tsx";
import {IntroContext} from "../../context/IntroContext.tsx";
import MusicContextProvider from "../../context/MusicContext.tsx";


const HeroSection = () => {
    const introContext = useContext(IntroContext)

    if (!introContext) {
        throw new Error('intro context is missing')
    }

    const {
        isIntro,
        startSite,
    } = introContext

    const heroRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isIntro === 'false' && startSite === true) {
            setTimeout(() => {
                heroRef.current?.classList.remove('hero-section-hidden')
            }, 7000)
        }
    }, [startSite])

    const [inputQuery, setInputQuery] = useState<string>('')

    // @ts-ignore
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
                <MusicContextProvider>
                    <SearchInput />
                    <TracksList />
                </MusicContextProvider>
            </div>
        </main>
    )
}

export default HeroSection