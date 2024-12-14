import { DOMAIN } from "../Utils/constants";

// get all articles 
export async function getArticles() {
    const response = await fetch(
        `${DOMAIN}/api/articles`, { cache: 'no-store' }
    )
    if (!response.ok) {
        throw new Error("Faild to fetch articles")
    }
    return response.json()
}

export async function getSingleArticle(articleId: string){
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }

    return response.json();
}