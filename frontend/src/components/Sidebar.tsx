import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.ts";

const Sidebar = () => {
    const { logout, isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    // Logout
    const handleLogout = () => {
        logout();
        navigate("/auth/login");
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <aside id="logo-sidebar"
               className="fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
               aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white flex flex-col">
                <ul className="space-y-2 font-medium flex-grow">
                    {/* Sidebar Content */}
                    <Link to="/" className="flex">
                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-dark group"> {/* Removed dark:text-white dark:group-hover:text-white */}
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white" // Removed dark:text-gray-400 dark:group-hover:text-white
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 22 21">
                                    <path
                                        d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path
                                        d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span className="ms-3 text-gray-500 group-hover:text-white">Dashboard</span>
                            </div>
                        </li>
                    </Link>
                </ul>


                <ul className="mt-auto space-y-2 font-medium">
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-red-600 group hover:text-white transition duration-75" // Adjusted styling for logout button
                        >
                            <span className="ms-3 text-gray-500 group-hover:text-white">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;