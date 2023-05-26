'use client'

import { useSearchParams  } from 'next/navigation';
import { useStoreState } from 'easy-peasy';
import { useEffect } from "react";

export default function DetailedArticle() {
    const params = useSearchParams();
    const id = params.get('id');
    const articles = useStoreState((state) => state.articles.articles);


    // save article information into localStroage
    if (articles.length > 0 && typeof window !== 'undefined') {
        const articleJSON = JSON.stringify(articles.find((arti: any) => arti.id == id));
        localStorage.setItem('article', articleJSON);
    }

    useEffect(() => {
        const articleStr = localStorage.getItem('article');
        const article = JSON.parse(articleStr);
        const html =  `<h1>title: ${article ? article.title : ''}</h1>
        <p>description: ${article ? article.description : ''}</p>
        <p>content: ${article ? article.content : ''}</p>
        <p>author: ${article ? article.author : ''}</p>
        <p>publishedAt: ${article ? article.publishedAt : ''}</p>`;
        let container = document.querySelector('.detailed-article');
        if (container)
            container.innerHTML = html;
    }, []);


    return (
        <>
            <div className='detailed-article'>
            </div>
        </>
    );
}