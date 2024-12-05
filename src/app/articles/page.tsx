// pages/articles.js

import Link from "next/link";
import ArticleCard from "../_Components/Articles/ArticleCard";

const articles = [
  {
    title: "How to Build a React App",
    description:
      "In this article, we explore how to build a simple React application from scratch.",
    date: "December 5, 2024",
    link: "/article1",
  },
  {
    title: "Next.js: The Ultimate Guide",
    description:
      "This comprehensive guide will teach you everything you need to know about Next.js and how to use it effectively.",
    date: "November 25, 2024",
    link: "/article2",
  },
  {
    title: "Tailwind CSS Basics",
    description:
      "An introduction to Tailwind CSS, a utility-first CSS framework, and how to use it in your projects.",
    date: "October 15, 2024",
    link: "/article3",
  },
];

 function ArticlesPage() {
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-center text-black mb-8">
          Articles
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         <ArticleCard/>
         <ArticleCard/>
         <ArticleCard/>
         <ArticleCard/>

        </div>
      </div>
    </div>
  );
}

export default ArticlesPage