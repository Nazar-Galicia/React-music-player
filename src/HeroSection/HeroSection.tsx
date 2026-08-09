import type {FC} from "react";
import SearchInput from "../components/SearchInput/SearchInput.tsx";

const HeroSection: FC = () => {
    return (
        <main className='hero-section'>
            <h1 className='hero-heading'>Search everything...</h1>

            <SearchInput />
        </main>
    )
}

export default HeroSection