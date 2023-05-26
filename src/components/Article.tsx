import { useRouter } from 'next/navigation';
import { Article } from '@/store/models/articleModel';

interface Props {
    data: Article
}

export default function ArticleComp(props: Props): JSX.Element {
    const { id, title, source, urlToImage } = props.data;

    const router = useRouter();

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl mt-3">
            <div className="md:flex">
                <div className="md:shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src={`${urlToImage}`} alt="article image" />
                </div>
                <div className="p-8">
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline" onClick={() => router.push(`/article?id=${id}`)}>{ source.name }</a>
                    <p className="mt-2 text-slate-500">{ title }</p>
                </div>
            </div>
        </div>
    )
}