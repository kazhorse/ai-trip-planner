import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .envから取得
});

export async function POST(req: Request) {
  try {
    const { qaPairs } = await req.json();

    if (!qaPairs || qaPairs.length === 0) {
      return NextResponse.json({ error: "質問と回答がありません。" }, { status: 400 });
    }

    // ✅ プロンプト形式に整形
    const qaList = qaPairs.map(
      (pair: { question: string; answer: string }, index: number) =>
        `Q${index + 1}. ${pair.question}\nA${index + 1}. ${pair.answer || "（未回答）"}`
    );

    const prompt = `
以下は旅行者との質疑応答です。この内容に基づいて、その人に最適な日帰りまたは1泊2日の旅行プランを提案してください。
具体的なスケジュールやおすすめスポット、理由なども含めてください。

${qaList.join("\n\n")}
`;

    // ✅ GPTに投げる
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // または "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;

    return NextResponse.json({
      response: result,
      qaPairs,
    });
  } catch (error) {
    console.error("GPT API エラー:", error);
    return NextResponse.json(
      { error: "旅行プランの生成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
