import type {FC} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Visualiser from "./pages/Visualiser/Visualiser.tsx";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/visualiser/:artist/:trackName' element={<Visualiser />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;