import { Route, Routes } from "react-router";
import CreateTeam from "./_root/pages/CreateTeam";
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Signin from "./_auth/forms/signin";
import Signup from "./_auth/forms/signup";


export default function App() {
    return (
        <>
            <main className="flex w-full h-screen ">
                <Routes>
                    {/* public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>

                    {/* private routes */}
                    <Route element={<RootLayout />}>
                        <Route index element={<CreateTeam />} />
                    </Route>
                </Routes >
            </main >
            <Toaster />
        </>
    )
}