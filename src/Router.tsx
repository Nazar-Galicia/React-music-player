import type {FC} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Visualiser from "./pages/Visualiser/Visualiser.tsx";
import ToasterProvider from "./context/ToasterContext.tsx";
import Toast from "./components/Toast/Toast.tsx";

const Router: FC = () => {
    return (
        <BrowserRouter>
            <ToasterProvider>
                <Toast />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/visualiser/:artist/:trackName' element={<Visualiser />}/>
                </Routes>
            </ToasterProvider>
        </BrowserRouter>
    )
}

export default Router;