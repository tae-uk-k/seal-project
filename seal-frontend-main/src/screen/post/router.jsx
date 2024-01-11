import { Route, Routes } from "react-router-dom";
import { Main } from "./main";
import { Write } from "./write";
import { Item } from './item'
import { Search } from './search'

export function PostRouter() {

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/write" element={<Write />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:id/" element={<Item />} />
        </Routes>
    )
}