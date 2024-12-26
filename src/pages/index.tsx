// CSS Module next에서 페이지 별로 css 클래스명이 중복되는 것을 방지하기 위해 css 파일의 import를 전역 컴포넌트에서만 허용하고 있다.
// 그러기에 css 모듈을 사용해서 각 중복되는 클래스명에 충돌을 방지한다.
import SeacrchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import style from "./index.module.css";
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {

    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks()
    ]);

    return {
        props: {
            allBooks,
            recoBooks,
        },
    };
};

export default function Home({
                                 allBooks,
                                 recoBooks
                             }: InferGetStaticPropsType<
    typeof getStaticProps
>) {

    return (
        <>
            <Head>
                <title>한입북스</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입북스"/>
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
            </Head>
            <div className={style.container}>
                <section>
                    <h3>지금 추천하는 도서</h3>
                    {recoBooks.map((book) => (
                        <BookItem key={book.id} {...book} />
                    ))}
                </section>
                <section>
                    <h3>등록된 모든 도서</h3>
                    {allBooks.map((book) => (
                        <BookItem key={book.id} {...book} />
                    ))}
                </section>
            </div>
        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return (<SeacrchableLayout>{page}</SeacrchableLayout>);
};