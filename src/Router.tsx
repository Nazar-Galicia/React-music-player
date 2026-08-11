import type {FC} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Lyrics from "./pages/Lyrics/Lyrics.tsx";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/lyrics/:artist/:trackName' element={<Lyrics />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;