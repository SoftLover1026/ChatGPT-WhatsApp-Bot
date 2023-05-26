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
        
        // const data = {
        //     "status": "ok",
        //     "totalResults": 36,
        //     "articles": [
        //         {
        //             "source": {
        //                 "id": null,
        //                 "name": "Eonline.com"
        //             },
        //             "author": "Jess Cohen",
        //             "title": "Prince Harry and Meghan Markle's Rep Slams \"Abhorrent\" Allegations About Car Chase Being a PR Stunt - E! NEWS",
        //             "description": "Days after Prince Harry and Meghan Markle’s team said were involved in a \"near catastrophic\" car chase with paparazzi, the couple's rep is responding to critics claiming the incident was a PR stunt.",
        //             "url": "https://www.eonline.com/news/1375230/prince-harry-and-meghan-markles-rep-slams-abhorrent-allegations-about-car-chase-being-a-pr-stunt",
        //             "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/2023416/rs_1200x1200-230516164859-1200-prince-harry-meghan-markle-GettyImages-1490796993.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
        //             "publishedAt": "2023-05-23T15:15:00Z",
        //             "content": "Prince Harry and Meghan Markle's team is serving up some royal tea for critics of the couple.\r\nNearly a week after a rep for the Duke and Duchess of Sussex said they were involved in a two-hour car c… [+751 chars]"
        //         },
        //         {
        //             "source": {
        //                 "id": "techcrunch",
        //                 "name": "TechCrunch"
        //             },
        //             "author": "Kyle Wiggers",
        //             "title": "Microsoft’s Azure AI Studio lets developers build their own AI ‘copilots’ - TechCrunch",
        //             "description": "Microsoft is introducing several new features in Azure AI Studio aimed at enabling companies to build and deploy fine-tuned AI 'copilots.'",
        //             "url": "https://techcrunch.com/2023/05/23/microsoft-debuts-azure-ai-studio-to-let-developers-build-their-own-ai-copilots/",
        //             "urlToImage": "https://techcrunch.com/wp-content/uploads/2020/07/GettyImages-513711216.jpg?resize=1200,800",
        //             "publishedAt": "2023-05-23T15:02:15Z",
        //             "content": "Microsoft wants companies to build their own AI-powered “copilots” — using tools on Azure and machine learning models from its close partner OpenAI, of course.\r\nToday at its annual Build conference, … [+3491 chars]"
        //         },
        //         {
        //             "source": {
        //                 "id": "the-verge",
        //                 "name": "The Verge"
        //             },
        //             "author": "Tom Warren",
        //             "title": "Microsoft's Copilot and Bing AI plug-ins will be interoperable with ChatGPT - The Verge",
        //             "description": "Microsoft is using the same open standard as OpenAI for plug-ins across Bing and Copilot. It means developers and users can create AI plug-ins that are interoperable between ChatGPT, Bing, and Copilot.",
        //             "url": "https://www.theverge.com/2023/5/23/23732505/microsoft-ai-bing-copilot-chatgpt-interoperability-support-build",
        //             "urlToImage": "https://cdn.vox-cdn.com/thumbor/CCAiZOaSXBZ90QlUG4O76gDxwwc=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24347780/STK095_Microsoft_04.jpg",
        //             "publishedAt": "2023-05-23T15:00:00Z",
        //             "content": "Microsofts Copilot and Bing AI plug-ins will be interoperable with ChatGPT\r\nMicrosofts Copilot and Bing AI plug-ins will be interoperable with ChatGPT\r\n / Microsoft will use the same open standard as… [+2423 chars]"
        //         },
        //         {
        //             "source": {
        //                 "id": "polygon",
        //                 "name": "Polygon"
        //             },
        //             "author": "Cass Marshall",
        //             "title": "Warhammer 40K: Boltgun review: an absolute blast of a boomer shooter - Polygon",
        //             "description": "Warhammer 40K: Boltgun is a boomer shooter inspired by classics like Doom, but set in the grimdark universe of Warhammer 40,000. The story ties into Space Marine, and the combat is fast-paced and fun.",
        //             "url": "https://www.polygon.com/reviews/23733394/warhammer-40k-boltgun-review-sternguard-veteran",
        //             "urlToImage": "https://cdn.vox-cdn.com/thumbor/f1WjD1zrYFVvpXgb7Xw_blJ7eao=/0x38:1920x1043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24674569/ss_ec6c2e124024a659709e0efa678e1e576914108e.jpg",
        //             "publishedAt": "2023-05-23T15:00:00Z",
        //             "content": "In the grim darkness of the far future, there is only war. The Emperors finest, the transhuman Space Marines, are the bulwark defending humanity from the malevolent forces of Chaos. Sometimes, the se… [+4587 chars]"
        //         }
        //     ]
        // }

        res.data.articles.map((article, idx) => {
            // generate unique id to identify article
            let d = new Date();
            const id = d.getTime() + idx;
            let idObj = {id};
            addArticle({...article, ...idObj});
        })

        console.log(page)
    }
    
    useEffect(() => {
        getArticles();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    const handleScroll = () => {
        const isScrollBottom = (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight);
        const isSearchKey = (searchKeyword != '');

        if (isScrollBottom && !isSearchKey) {   
            setPage((prevPage) => prevPage + 1);
        }
    }

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        removeArticle();
        setPage((page) => page = 1);
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