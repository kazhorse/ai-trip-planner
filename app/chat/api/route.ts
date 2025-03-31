import { NextResponse } from "next/server";

// ✅ プラン生成API
export async function POST(req: Request) {
  try {
    const { qaPairs } = await req.json();

    if (!qaPairs || qaPairs.length === 0) {
      return NextResponse.json({ error: "質問と回答がありません。" }, { status: 400 });
    }

    // ✅ 仮のプラン情報
    const planDetails = qaPairs
      .map((pair: { question: string; answer: string }, index: number) => {
        return `Day ${index + 1}: ${pair.answer || "情報未入力"}`;
      });

    const planResponse = `以下の内容に基づき旅行プランを提案します：\n${planDetails.join("\n")}`;

    // ✅ JSON で返す
    return NextResponse.json({
      response: planResponse,
      details: planDetails,
    });
  } catch (error) {
    console.error("API エラー:", error);
    return NextResponse.json(
      { error: "プラン生成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
