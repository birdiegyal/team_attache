import { Route, Routes } from "react-router";
import CreateTeam from "./pages/CreateTeam";
import "./globals.css"

export default function App(){
    return (
        <main className="w-full h-screen ">
            <Routes>
                <Route index element={<CreateTeam />} />
            </Routes>
        </main>
    )
}