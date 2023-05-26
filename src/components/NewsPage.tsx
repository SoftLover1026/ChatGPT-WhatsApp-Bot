"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Article } from '@/store/models/articleModel';
import ArticleComp from './Article';

export default function NewsPageComp(): JSX.Element {
    const [page, setPage] = useState<number>(1);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const PAGE_SIZE = 20;
    
    const NewsAPIKey = process.env.NewsAPIKey;
    const NewsAPIEndpoint = process.env.NewsAPIEndpoint;
    const TopNewsAPIEndpoint = process.env.TopNewsAPIEndpoint;
    
    const articles = useStoreState((state) => state.articles.articles);
    const addArticle = useStoreActions((actions) => actions.articles.addArticle);
    const removeArticle = useStoreActions((actions) => actions.articles.removeArticle)


    async function getArticles(): Promise<void> {
        let res;
        if (searchKeyword === '') {
          res = await axios.get(`${TopNewsAPIEndpoint}?page=${page}&pageSize=${PAGE_SIZE}&apiKey=${NewsAPIKey}`);
        } else {
          res = await axios.get(`${NewsAPIEndpoint}?q=${searchKeyword}&page=${page}&pageSize=${PAGE_SIZE}&apiKey=${NewsAPIKey}`);
        }
 

        res.data.articles.map((article: Article, idx: number) => {
            // generate unique id to identify article
            let d = new Date();
            const id = d.getTime() + idx;
            let idObj = {id};
            addArticle({...article, ...idObj});
        })

        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        getArticles();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [searchKeyword]);

    const handleScroll = () => {
        const isScrollBottom = (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight);
        const isSearchKey = (searchKeyword != '');

        if (isScrollBottom && !isSearchKey) {
            getArticles();
        }
    }

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        removeArticle();
        setPage(1);
        setSearchKeyword(event.target.value);
        getArticles();
    }

    return (
        <>
            <div className='mt-5'>
                <div className='table max-w-md mx-auto overflow-hidden md:max-w-4xl'>
                    <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="search" type="text" placeholder="Search..." onChange={handleSearchKeyword} />
                </div>
                {
                articles.map((article: Article, idx: number) => (
                    <ArticleComp key={idx} data={article} />
                ))}
            </div>
        </>
    );
}