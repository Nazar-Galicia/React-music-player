import {type FC, useEffect, useRef} from "react";
import SearchInput from "../components/SearchInput/SearchInput.tsx";
import './HeroSection.css'

interface HeroSectionProps {
    isIntro: string,
}

const HeroSection: FC<HeroSectionProps> = (props) => {
    const {
        isIntro,
    } = props

    const heroRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isIntro === 'false') {
            setTimeout(() => {
                heroRef.current?.classList.remove('hero-section-hidden')
            }, 7000)
        }
    }, [])

    return (
        <main ref={heroRef} className={`hero-section ${isIntro === 'false' ? 'hero-section-hidden' : null}`}>
            <h1 className='hero-heading'>Search everything...</h1>

            <SearchInput />
        </main>
    )
}

export default HeroSection