import { Article } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white border-2 p-6 rounded-lg shadow-lg hover:shadow-xl  duration-300">
      <h2 className="text-2xl font-bold text-black mb-4">{article.title}</h2>
      <p className="text-gray-700 mb-4">{article.description}</p>
      <Link
        href={`/articles/${article.id}`}
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Read more &rarr;
      </Link>
    </div>
  )
}

export default ArticleCard
