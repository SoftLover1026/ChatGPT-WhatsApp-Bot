"use client"

import { StoreProvider } from 'easy-peasy';
import store from '@/store/index'
import NewsPageComp from '@/components/NewsPage';

function Home() {
    return (
        <>
            <StoreProvider store={store}>
                <NewsPageComp />
            </StoreProvider>
        </>
    );
}

export default Home;