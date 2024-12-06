"use client";

import React, { useState } from "react";
import Button from "../Ui-Items/Button";
import Modal from "../Ui-Items/Modal";

function ArticleList() {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const handleCloseDeleteModal = () => setIsOpenDeleteModal(false);

    const handleShowDeleteModal = () => {
        setIsOpenDeleteModal(true);
    };

    const removeArticleHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform delete logic here (e.g., API call to delete category)
        console.log("Category deleted");
        handleCloseDeleteModal();
    };

    const articles = [
        { id: 1, title: "Article 1", author: "Author 1", content: "This is the content of article 1." },
        { id: 2, title: "Article 2", author: "Author 2", content: "This is the content of article 2." },
    ];

    return (
        <div>
            {/* Modal for Deletion */}
            <Modal
                isOpen={isOpenDeleteModal}
                closeModal={handleCloseDeleteModal}
                onSubmit={removeArticleHandler}
                title="Confirm deletion"
                add={isDeleting ? 'loading...' : 'remove category'}
                btnClass="red"
            >
                <p>Are you sure about the category deletion process?</p>
            </Modal>

            {/* Article List */}
            <h2 className="text-xl font-bold mb-4">Articles</h2>
            <ul className="space-y-4">
                {articles.map((article) => (
                    <li key={article.id} className="bg-white shadow p-4 rounded border-2">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <p className="text-sm text-gray-500">By: {article.author}</p>
                        <p className="mt-2">{article.content}</p>
                        <div className="mt-4 flex space-x-2 justify-end">
                            <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600">
                                Edit
                            </Button>
                            <Button
                                onClick={handleShowDeleteModal}
                                className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;
