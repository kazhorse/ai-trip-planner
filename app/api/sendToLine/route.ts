import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: Request) {
  const { message } = await req.json();

  // ✅ cookies に型を明示して get メソッドを補完
  const cookieStore = cookies() as RequestCookies;
  const userId = cookieStore.get("lineUserId")?.value;

  if (!userId) {
    return new Response("LINEログインが必要です。", { status: 401 });
  }

  const token = process.env.LINE_MESSAGING_API_TOKEN;
  if (!token) {
    return new Response("LINEアクセストークンが未設定です。", { status: 500 });
  }

  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("LINE送信エラー:", errorText);
    return new Response("LINEへの送信に失敗しました。", { status: 500 });
  }

  return new Response("LINEに送信しました！", { status: 200 });
}
