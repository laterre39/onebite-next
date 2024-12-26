import style from "./[id].module.css";
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
    return {
        paths: [
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}},
        ],
        fallback: true,
        // false: 404 Notfound
        // blocking: SSR 방식
        // true: SSR 방식 + 데이터가 없는 풀백 상태의 페이지로부터 반환
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));

    if (!book) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            book,
        },
    };
};

export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>) {

    const router = useRouter();
    if (router.isFallback)
        return (
            <>
                <Head>
                    <title>한입북스</title>
                    <meta property="og:image" content="/thumbnail.png" />
                    <meta property="og:title" content="한입북스"/>
                    <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
                </Head>
                <div>
                    로딩중입니다.
                </div>
            </>
        );
    if (!book) return "문제가 발생했습니다 다시 시도하세요";

    const {title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={coverImgUrl} />
                <meta property="og:title" content="한입북스 - 검색결과"/>
                <meta property="og:description" content={description}/>
            </Head>
            <div className={style.container}>
                <div className={style.cover_img_container} style={{backgroundImage: `url('${coverImgUrl}')`}}>
                    <img src={coverImgUrl}></img>
                </div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>{author} | {publisher}</div>

                <div className={style.description}>{description}</div>
            </div>
        </>
    );
}

// 넥스트의 페이지 라우터(앱의 URL 경로 설정)는 프레임워크에서 폴더의 배치에 따라 동작한다.
// pages <- root 폴더를 부모로둔 자식 파일과 폴더를 넥스트가 URL 파라미터에 동적으로 대응한다.
// DEF_DOMAIN/search <- pages/search.tsx or pages/search/index.tsx 두개의 방식으로 라우팅할 수 있다.
// 또한 추가적인 주소의 값을 동적으로 대응하는 기능을 제공하는데 -> [변수].tsx 이름으로 페이지를 생성한다.
// DEF_DOMAIN/book/1 <- pages/book/[id].tsx 를 사용하면 라우팅 할 수 있으며 id 값으로 쿼리 속성으로 대응되서 저장된다. "Catch all segment"
// id 값으로 쿼리파라미터를 받아오는 이유는 id로 지정했기 때문이다 또한 [...id].tsx 를 사용해서 다양한 파라미터에 동적으로 대응할수도 있다.
// 예시로는 book/123/456/789 <- 각 123, 456, 789 를 id 필드로 배열로 받는다.
// 하지만 [var].tsx 방식은 기본 쿼리 주소(DEF_/book)을 지원하지 않는데 이는 [[...var]].tsx 를 사용해서 해결할 수 있다. "Optional catch segment"