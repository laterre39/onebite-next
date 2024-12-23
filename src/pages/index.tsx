// CSS Module next에서 페이지 별로 css 클래스명이 중복되는 것을 방지하기 위해 css 파일의 import를 전역 컴포넌트에서만 허용하고 있다.
// 그러기에 css 모듈을 사용해서 각 중복되는 클래스명에 충돌을 방지한다.
import style from "./index.module.css";

export default function Home() {
  return (
      <h1 className={style.h1}>인덱스</h1> // 모듈로 중복 제거 -> <h1 class="index_h1__JHo3j">인덱스</h1>
  );
}
