import type {FC} from "react";

interface IntroProps {
    isStartSite: boolean;
    isIntro: string,
}

const Intro: FC<IntroProps> = (props) => {
    const {
        isStartSite,
        isIntro,
    } = props

    return (
        <p className='intro-title'>
            <span className={`intro-listen ${isIntro === 'true' ? 'intro-word-hidden' : null}`}>Listen.</span>
            <span className={`intro-everywhere ${isIntro === 'true' ? 'intro-word-hidden' : null}`}>Everywhere.</span>
        </p>
    )
}

export default Intro