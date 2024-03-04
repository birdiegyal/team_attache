import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className='w-screen relative '>
            <Outlet />
        </div>

    )
}