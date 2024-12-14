import { Article } from "@prisma/client";
import { getArticles } from "../_apicalls/articlesApiCall";
import ArticleCard from "../_Components/Articles/ArticleCard";

async function ArticlesPage() {
    const result = await getArticles(); // Inspect the API response
    const articles = Array.isArray(result) ? result : result?.articles || [];

    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-center text-black mb-8">
            Articles
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default ArticlesPage;
