import { Route, Routes } from "react-router-dom";
import { Main } from "./main";


export function AllRouter(props) {

    return (
        <Routes>
            <Route path="/*" element={<Main />} />
        </Routes>
    )
}