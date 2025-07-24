import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
const AppLayout = () => {

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <main className="p-4 sm:ml-48 bg-[#f6f9fe] min-h-screen">
                <div className="rounded-lg mt-14">
                    <Outlet />
                </div>
            </main>
        </>

    )
}

export default AppLayout;