import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.ts";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, isLoggedIn, error } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(email, password);

        if (success) {
            console.log("Login Berhasil");
        } else {
            console.log("Login Gagal");
        }
    }

    return (
        <>
            <div className="bg-secondary-light min-h-screen flex items-center justify-center px-6 py-12 lg:px-8">
                {/* This div now acts as the central container for the white box */}
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"> {/* Adjusted classes here */}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm"> {/* This div is now redundant for max-width but keeps text alignment */}
                        <img src="/car_icon.svg" alt="Your Company" className="mx-auto h-20 w-auto" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Login</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> {/* This div is also somewhat redundant but keeps form alignment */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center ">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-secondary-dark px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                                >
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </div>

                            {error && (
                                <p className="mt-4 text-center text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;