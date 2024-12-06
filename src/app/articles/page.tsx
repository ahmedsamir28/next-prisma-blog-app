// pages/articles.js

import ArticleCard from "../_Components/Articles/ArticleCard";


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