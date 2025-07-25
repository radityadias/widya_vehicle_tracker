import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.ts";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const { login, loading, isLoggedIn, error: apiError } = useAuthStore();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    // Validasi Input
    const validateInputs = () => {
        let isValid = true;

        // Validasi email
        if (!email) {
            setEmailError("Email harus diisi.");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Format email tidak valid.");
            isValid = false;
        } else {
            setEmailError(null);
        }

        // Validasi password
        if (!password) {
            setPasswordError("Password harus diisi.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password minimal 6 karakter.");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        return isValid;
    };

    // Memanggil fungsi login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const inputsAreValid = validateInputs();

        if (!inputsAreValid) {
            console.log("Validasi sisi klien gagal.");
            return;
        }

        const success = await login(email, password);

        if (success) {
            console.log("Login Berhasil");
        } else {
            console.log("Login Gagal (API):", apiError);
        }
    }

    return (
        <>
            <div className="bg-secondary-light min-h-screen flex items-center justify-center px-6 py-12 lg:px-8">
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img src="/car_icon.svg" alt="Your Company" className="mx-auto h-20 w-auto" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Login</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* Input Forms */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                <div className="mt-2">
                                    {/* Input Email */}
                                    <input
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError(null);
                                        }}
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${emailError ? 'outline-red-500 focus:outline-red-600' : 'outline-gray-300 focus:outline-indigo-600'} placeholder:text-gray-400 sm:text-sm/6`}
                                    />
                                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center ">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                </div>
                                <div className="mt-2">
                                    {/* Input Password */}
                                    <input
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordError(null);
                                        }}
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 ${passwordError ? 'outline-red-500 focus:outline-red-600' : 'outline-gray-300 focus:outline-indigo-600'} placeholder:text-gray-400 sm:text-sm/6`}
                                    />
                                    {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                                </div>
                            </div>
                            {/* Button Submit */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-secondary-dark px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-secondary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                                >
                                    {loading ? 'Loading...' : 'Login'}
                                </button>
                            </div>
                            {/* Pesan Error */}
                            {apiError && (
                                <p className="mt-4 text-center text-sm text-red-600">
                                    {apiError}
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