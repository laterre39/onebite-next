import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter(); // 넥스트의 useRouter를 사용해서 URL의 쿼리 스트링을 가져와서 사용할 수 있다.
    const {id} = router.query; // 구조 분해 할당을 통해 받아온 쿼리 스트링을 변수로 렌더링에 사용할 수 있다.

    // 넥스트의 페이지 라우터(앱의 URL 경로 설정)는 프레임워크에서 폴더의 배치에 따라 동작한다.
    // pages <- root 폴더를 부모로둔 자식 파일과 폴더를 넥스트가 URL 파라미터에 동적으로 대응한다.
    // DEF_DOMAIN/search <- pages/search.tsx or pages/search/index.tsx 두개의 방식으로 라우팅할 수 있다.
    // 또한 추가적인 주소의 값을 동적으로 대응하는 기능을 제공하는데 -> [변수].tsx 이름으로 페이지를 생성한다.
    // DEF_DOMAIN/book/1 <- pages/book/[id].tsx 를 사용하면 라우팅 할 수 있으며 id 값으로 쿼리 속성으로 대응되서 저장된다. "Catch all segment"
    // id 값으로 쿼리파라미터를 받아오는 이유는 id로 지정했기 때문이다 또한 [...id].tsx 를 사용해서 다양한 파라미터에 동적으로 대응할수도 있다.
    // 예시로는 book/123/456/789 <- 각 123, 456, 789 를 id 필드로 배열로 받는다.
    // 하지만 [var].tsx 방식은 기본 쿼리 주소(DEF_/book)을 지원하지 않는데 이는 [[...var]].tsx 를 사용해서 해결할 수 있다. "Optional catch segment"

    return (
        <h1>Book {id}</h1>
    );
}