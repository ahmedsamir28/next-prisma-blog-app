import AddCommentForm from "@/app/_Components/comments/AddCommentForm";
import { DOMAIN } from "@/app/Utils/constants";
import axios from "axios";

interface SingleArticlePageProps {
  params: { id: string }
}

async function SingleArticlePage({ params }: SingleArticlePageProps) {
  // Make a GET request to fetch the article
  const response = await axios.get(`${DOMAIN}/api/articles/${params.id}`);
  const article = response.data; // Access the data from the response

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-400 mb-4">{new Date(article.createAt).toDateString()}</div> {/* Display creation date */}
      <p className="text-gray-700 mb-6">{article.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <div className="space-y-4">
        {article.comments.map((comment: any) => (
          <div key={comment.id} className="border border-gray-300 p-4 rounded shadow-sm">
            <p>{comment.text}</p> {/* Assuming 'text' is the comment content */}
            <p className="text-sm text-gray-500 mt-2">{new Date(comment.createAt).toDateString()}</p> {/* Format the comment's creation date */}
          </div>
        ))}
      </div>

      <div className="mt-7">
        <AddCommentForm articelId={article.id} />
      </div>
    </div>
  );
}

export default SingleArticlePage;
