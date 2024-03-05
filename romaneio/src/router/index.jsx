import { HashRouter, Route, Routes } from "react-router-dom";
import { App } from "../templates/App";
import { RomaneioCanva } from "../templates/RomaneioCanva";

export const Router = () => {
    return (
        <HashRouter>
            <Routes>
               <Route path="/" element={<App />} />
               <Route path="/romaneio" element={<RomaneioCanva />} />
            </Routes>
        </HashRouter>
    );
}