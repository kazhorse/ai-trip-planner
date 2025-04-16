"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Plan() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // URL から質問と回答のペアを取得
  const qaPairsParam = searchParams.get("qaPairs");
  const qaPairs = qaPairsParam
    ? JSON.parse(decodeURIComponent(qaPairsParam))
    : [];

  useEffect(() => {
    const fetchPlan = async () => {
      try {
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
      fetchPlan();
    }
  }, []);

  // トップに戻る
  const handleGoHome = () => {
    router.push("/");
  };

  // LINE に送信
  const handleSendToLine = async () => {
    if (!plan) return;

    const res = await fetch("/api/sendToLine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: plan }),
    });

    const text = await res.text();
    alert(text);
  };

  return (
    <div className="min-h-screen bg-[#e0f7fa] flex items-center justify-center py-8 px-4 overflow-auto">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">旅行プラン</h1>

        {error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : plan ? (
          <>
            <pre className="text-lg whitespace-pre-wrap mb-4">{plan}</pre>

            <button
              onClick={handleSendToLine}
              className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              LINEで受け取る
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-500 mb-4">プランを生成中...</p>
        )}

        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
}
