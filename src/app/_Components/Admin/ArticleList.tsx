"use client";
import React, { useState } from "react";
import Button from "../Ui-Items/Button";
import { toast } from "react-toastify";
import { getArticles } from "@/app/_apicalls/articlesApiCall";
import { Article } from "@prisma/client";
import { DOMAIN } from "@/app/Utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "../Ui-Items/Modal";

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

    const router = useRouter();

    React.useEffect(() => {
        async function fetchArticles() {
            try {
                const result = await getArticles();
                const fetchedArticles = Array.isArray(result) ? result : result?.articles || [];
                setArticles(fetchedArticles);
            } catch {
                toast.error("Failed to fetch articles");
            }
        }
        fetchArticles();
    }, []);

    const handleCloseEditModal = () => {
        setIsOpenEditModal(false);
        setCurrentArticle(null);
    };

    const handleٍShowEditModal = (article: Article) => {
        setCurrentArticle(article);
        setIsOpenEditModal(true);
    };

    const EditArticleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentArticle) return;

        try {
            setIsEdit(true)
            await axios.put(`${DOMAIN}/api/articles/${currentArticle.id}`, currentArticle);
            toast.success("Article updated successfully");
            router.refresh();
            handleCloseEditModal();
        } catch {
            toast.error("Failed to update article");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!currentArticle) return;
        const { name, value } = e.target;
        setCurrentArticle({ ...currentArticle, [name]: value });
    };

    const deleteArticleHandler = async (e: React.MouseEvent<HTMLButtonElement>, articleId: number) => {
        e.preventDefault();
        try {
            await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
            toast.success("Article deleted successfully");
            router.refresh();
        } catch {
            toast.error("Failed to delete article");
        }
    };

    return (
        <div>
            {/* Modal for Editing */}
            <Modal
                isOpen={isOpenEditModal}
                closeModal={handleCloseEditModal}
                onSubmit={EditArticleHandler}
                title="Edit Article"
                add={isEdit ? "Saving..." : "Save Changes"}
                btnClass="blue"
            >
                {currentArticle && (
                    <form>
                        <div className="mb-4">
                            <label className="block font-semibold">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={currentArticle.title}
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Description:</label>
                            <textarea
                                name="description"
                                value={currentArticle.description}
                                onChange={handleInputChange}
                                className="w-full border px-2 py-1 rounded"
                            />
                        </div>
                    </form>
                )}
            </Modal>

            <h2 className="text-xl font-bold mb-4">Articles</h2>
            {articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <ul className="space-y-4">
                    {articles.map((article: Article) => (
                        <li
                            key={article.id}
                            className="bg-white shadow p-4 rounded border-2"
                        >
                            <h3 className="text-lg font-semibold">{article.title}</h3>
                            <p className="mt-2">{article.description}</p>
                            <div className="mt-4 flex space-x-2 justify-end">
                                <Button
                                    onClick={() => handleٍShowEditModal(article)}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={(e) => deleteArticleHandler(e, article.id)}
                                    className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                                >
                                    Delete
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
