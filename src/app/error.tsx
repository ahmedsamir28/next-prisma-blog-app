"use client" 
import React from "react";
import { NextPageContext } from "next";
import Link from "next/link";

interface ErrorPageProps {
    statusCode: number | undefined;
}

const ErrorPage = ({ statusCode }: ErrorPageProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold">
                {statusCode ? `Error ${statusCode}` : "An error occurred"}
            </h1>
            <p className="mt-4 text-lg">
                {statusCode === 404
                    ? "Sorry, the page you're looking for does not exist."
                    : "Oops! Something went wrong. Please try again later."}
            </p>
            <Link
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go Back Home
            </Link>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode};
};

export default ErrorPage;
