import "@/styles/globals.css";
import type {AppProps} from "next/app";
import GlobalLayout from "@/components/global-layout";
import {ReactNode} from "react";
import {NextPage} from "next";

type NextPageWithLayout = NextPage & { // 기존의 NexPage 타입에 getLayout 을 추가해서 확장한다.
    getLayout?: (page: ReactNode) => ReactNode; // 반환 타입으로 ReactNode -> 페이지 없을 수도 있으니 옵셔널(?) 타입으로 지정한다.
}

export default function App({ Component, pageProps }: AppProps & {Component: NextPageWithLayout}) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
    // 확장한 타입을 컴포넌트에 타입으로 적용한다.

    return (
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
        </GlobalLayout>
    );
}
