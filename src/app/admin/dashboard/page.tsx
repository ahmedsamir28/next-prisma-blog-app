"use client";

import React, { useState } from "react";
import AddArticleForm from "@/app/_Components/Admin/AddArticleForm";
import Breadcrumb from "@/app/_Components/Admin/Breadcrumb";
import ArticleList from "@/app/_Components/Admin/ArticleList";

function AdminDashboardPage() {
    const [showForm, setShowForm] = useState(false);

    return (

        <div className="">
            <div className="mt-5">
                <Breadcrumb setShowForm={setShowForm} />
            </div>

            <main className="flex-1 p-6">
                {showForm ? <AddArticleForm /> : <ArticleList />}
            </main>
        </div>
    );
}

export default AdminDashboardPage;
