import { Route, Routes } from "react-router";
import CreateTeam from "./_root/pages/CreateTeam";
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Signin from "./_auth/forms/signin";
import Signup from "./_auth/forms/signup";
import InviteMembers from "./_root/pages/InviteMembers";
import AcceptInvitation from "./_root/pages/AcceptInvitation";


export default function App() {
    return (
        <>
            <main className="w-screen">
                <Routes>
                    {/* public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>

                    {/* private routes */}
                    <Route element={<RootLayout />}>
                        <Route index element={<CreateTeam />} />
                        <Route path="/invitemembers" element={<InviteMembers />}/>
                        <Route path="/acceptinvite" element={<AcceptInvitation/>}/>
                    </Route>
                </Routes >
            </main >
            <Toaster />
        </>
    )
}