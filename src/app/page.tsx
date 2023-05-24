"use client"

import { useState, useEffect } from 'react';

const NewsAPIKey = '59a46722351e450ca6d7b627bb000534';
const NewsAPIEndpoint = 'https://newsapi.org/v2/top-headlines';

interface Article {
  title: string;
  // Add more article properties here as needed
}

interface NewsApiResponse {
  articles: Article[];
  // Add more properties of the NewsAPI response here as needed
}

 
export default function Home(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);

  async function getArticles(): Promise<void> {
    const res = await fetch(
      `${NewsAPIEndpoint}?country=us&page=${page}&apiKey=${NewsAPIKey}`
    );
    const data: NewsApiResponse = await res.json();
    setArticles((prevArticles) => [...prevArticles, ...data.articles]);
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    getArticles();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll(): void {
    console.log('aa')
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      getArticles();
    }
  }

   return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.title}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}