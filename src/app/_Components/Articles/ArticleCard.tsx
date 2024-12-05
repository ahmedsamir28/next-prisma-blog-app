import Link from 'next/link'
import React from 'react'

function ArticleCard() {
    return (
        <div
            className="bg-white border-2 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <h2 className="text-2xl font-bold text-black mb-4">title of articles</h2>
            <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet consectetur adipisicinctus quis necessitatibus ad ipsam autem?</p>
            <p className="text-sm text-gray-500 mb-4">November 25, 2024</p>
            <Link
                href='articles/4'
                className="text-blue-500 hover:text-blue-700 font-semibold"
            >
                Read more &rarr;
            </Link>
        </div>
    )
}

export default ArticleCard
