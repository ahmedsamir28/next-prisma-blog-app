"use client"
import React, {  FormEvent, useState } from 'react'

function AddArticleForm() {
    const [formData, setFormData] = useState({ title: "",content: "" });

    const handleSubmit = (e :FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted Article:", formData);
        setFormData({ title: "", content: "" });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add New Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        className="w-full px-4 py-2 border rounded"
                        rows={5}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        required
                    ></textarea>
                </div>
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

export default AddArticleForm
