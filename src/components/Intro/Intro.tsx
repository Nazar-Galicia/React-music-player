import type {FC} from "react";

interface IntroProps {
    isStartSite: boolean;
}

const Intro: FC<IntroProps> = (props) => {
    const {
        isStartSite,
    } = props

    return (
        <p className='intro-title'>
            <span className='intro-listen'>Listen.</span>
            <span className='intro-everywhere'>Everywhere.</span>
        </p>
    )
}

export default Intro