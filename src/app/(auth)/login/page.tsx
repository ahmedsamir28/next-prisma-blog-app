import React from 'react'

function login() {
    return (
        <div className="flex justify-center items-center fix-hight min-h-[calc(70vh-100px)]">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md border-2">
                <h2 className="text-2xl font-semibold text-center text-black mb-6">Login</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-black text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition duration-200"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="#" className="text-black text-sm hover:underline">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default login
