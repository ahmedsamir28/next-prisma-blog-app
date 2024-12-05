import Link from "next/link";
import React from 'react'
import { FaBlog } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2 text-black">
                            <FaBlog />
                            <span className="font-bold text-xl">BlogSpace</span>
                        </Link>
                        <Link href="/articles" className="flex items-center space-x-2 hover:text-zinc-800">
                            <FaSwatchbook />
                            <span>Articles</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href='admin/dashboard'  className="flex items-center gap-1 cursor-pointer ">
                            <FaRegUser /> <span className="capitalize">ahmedsmair</span>
                        </Link>
                        <Link href="/login">
                            <button className="flex items-center space-x-2 hover:bg-zinc-100 px-3 py-2 rounded-lg">
                                <MdLogin />
                                <span>Login</span>
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="flex items-center space-x-2 bg-black hover:bg-neutral-800 px-3 py-2 rounded-lg  text-white">
                                <MdLogin />
                                <span>Register</span>
                            </button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>)
}

export default Header