'use client';
import { useState } from 'react';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* 説明ボタンのみ */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
      >
        説明
      </button>

      {/* モーダル表示（そのまま） */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl shadow-lg border border-gray-200">
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
              質問に答えるだけで、<br />
              AIがあなたにピッタリの旅行プランを作成！<br /><br />
              すべてチャット式だからカンタン！<br />
              1. AIが旅行について質問！<br />
              2. チャットで質問に答えるだけ！<br />
              3. あなたに最適なプランを提案します！<br /><br />
              「行き先も決まってない…」そんなときも大丈夫！<br />
              AI botが会話しながら、ピッタリの旅行先を見つけてくれます！<br /><br />
              旅行計画をもっとラクに、もっと楽しく！
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
