"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { DOMAIN } from '@/app/Utils/constants';

interface AddCommentFormProps {
    articelId: number;
}

const AddCommentForm = ({ articelId }: AddCommentFormProps) => {
    const router = useRouter();
    const [text, setText] = useState("");

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text === "") return toast.error("Please write something");

        try {
            await axios.post(`${DOMAIN}/api/comments`, { text, articelId });
            router.refresh();
            setText("");
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        
            <form onSubmit={formSubmitHandler} className="mt-6">
                <label htmlFor="newComment" className="block text-sm font-medium">
                    Add a Comment
                </label>
                <textarea
                    onChange={(e) => setText(e.target.value)}

                    id="newComment"
                    name="newComment"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                    placeholder="Write your comment here..."
                    required
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Comment
                </button>
            </form>
    )
}

export default AddCommentForm;