"use client";

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DOMAIN } from '@/app/Utils/constants';
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // Input change handler
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formState;

        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${DOMAIN}/api/users/login`,
                { email, password }
            );

            if (response.status === 200) {
                toast.success("Login successful!");
                setFormState({ email: "", password: "" });
                setTimeout(() => {
                    router.replace('/')
                    router.refresh()
                }, 1000);

            } else {
                toast.error("Invalid credentials. Please try again.");
            }
        } catch {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(70vh-100px)]">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md border">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form onSubmit={formSubmitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formState.password}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white rounded-md font-semibold transition duration-200 ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="#" className="text-sm hover:underline">
                        Forgot Password?
                    </a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
