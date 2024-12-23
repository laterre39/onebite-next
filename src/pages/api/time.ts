import type {NextApiRequest, NextApiResponse} from "next";

// next 에서 api 쉬운 개발을 위해 Api routes 기능을 제공하고 있음
export default function handler(
    req: NextApiRequest, // 기본적으로 제공하는 응답 객체들
    res: NextApiResponse,
    ) {

    const date = new Date();
    res.json({time: date.toLocaleString()});
}