"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Plan() {
  const searchParams = useSearchParams();
  const router = useRouter(); // ✅ 追加
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ✅ URL から質問と回答のペアを取得
  const qaPairsParam = searchParams.get("qaPairs");
  const qaPairs = qaPairsParam
    ? JSON.parse(decodeURIComponent(qaPairsParam))
    : [];

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // ✅ API に qaPairs を送信
        const res = await fetch("/chat/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qaPairs }),
        });

        if (res.ok) {
          const data = await res.json();
          setPlan(data.response);
        } else {
          setError("API からのプラン生成に失敗しました。");
        }
      } catch (error) {
        console.error("API エラー:", error);
        setError("プラン生成中にエラーが発生しました。");
      }
    };

    if (qaPairs.length > 0) {
      fetchPlan(); // ✅ API を呼び出して仮プラン生成
    }
  }, [qaPairs]);

  // ✅ トップに戻るボタンのクリック処理
  const handleGoHome = () => {
    router.push("/"); // ✅ トップページへ遷移
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-[#e0f7fa]" // ✅ 元の背景色
    >
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">旅行プラン</h1>

        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : plan ? (
          <p className="text-lg whitespace-pre-line mb-4">{plan}</p>
        ) : (
          <p className="text-lg text-gray-500 mb-4">プランを生成中...</p>
        )}

        {/* ✅ トップに戻るボタン */}
        <button
          onClick={handleGoHome}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
}
