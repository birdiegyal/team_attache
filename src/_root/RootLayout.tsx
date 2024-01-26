import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="w-full">
            <section className='min-w-full h-full relative'>
                <Outlet />
            </section>
        </div>
    )
}