"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { DOMAIN } from "@/app/Utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  // State to manage form input values
  const [formState, setFormState] = useState({
    username: "",
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

  // Form submit handler
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formState;

    // Validation checks
    if (!username || !email || !password) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);
    try {
      // Axios POST request
      const response = await axios.post(`${DOMAIN}/api/users/register`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        setFormState({
          username: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          router.replace("/");
          router.refresh()
        }, 1000);

      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md border-2">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Register
        </h2>

        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              onChange={onChangeHandler}
              type="email"
              id="email"
              name="email"
              value={formState.email}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              onChange={onChangeHandler}
              type="text"
              id="username"
              name="username"
              value={formState.username}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={onChangeHandler}
              type="password"
              id="password"
              name="password"
              value={formState.password}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md font-semibold transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link href="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
