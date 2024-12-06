import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-black p-8">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">Page Not Found</p>
          <p className="text-lg">
            The page you&re looking for does not exist.{' '}
            <Link href="/" className="text-blue-400 hover:underline">
              Go back to the homepage
            </Link>
          </p>
        </div>
      </div>
    )
}

export default NotFoundPage
