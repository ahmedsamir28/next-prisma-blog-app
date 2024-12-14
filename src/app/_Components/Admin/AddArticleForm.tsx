"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DOMAIN } from "@/app/Utils/constants";

function AddArticleForm() {
    const [formData, setFormData] = useState({ title: "", description: "" });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post(`${DOMAIN}/api/articles`, formData);
            toast.success("Article added successfully!");
            setFormData({ title: "", description: "" });

        } catch {
            toast.error("Failed to add the article. Please try again later.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add New Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 border rounded"
                        value={formData.title}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Content Field */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full px-4 py-2 border rounded"
                        rows={5}
                        value={formData.description}
                        onChange={onChangeHandler}
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Add Article
                </button>
            </form>
        </div>
    );
}

export default AddArticleForm;
