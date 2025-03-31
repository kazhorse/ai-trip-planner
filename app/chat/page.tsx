"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'; 
import Image from "next/image";
import Modal from "../../components/modal"; 

const questions = [
  "どこから出発しますか？",
  "行きたい場所は決まっていますか？",
  "旅行の予算はどれくらいですか？",
  "出発日時と帰宅日時、もしくは日帰りか何泊するかを教えてください？",
  "どの交通手段を使う予定ですか？（飛行機、電車、バス、車 など）",
  "誰と一緒に旅行しますか？（一人、友達、家族、恋人 など）"
];

export default function Home() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: questions[0] }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState(80);
  const [showModal, setShowModal] = useState(false);

  const inputContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 入力欄の高さをリアルタイム調整
  useEffect(() => {
    if (inputContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (inputContainerRef.current) {
          setInputHeight(inputContainerRef.current.clientHeight);
        }
      });

      resizeObserver.observe(inputContainerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  // 最新メッセージに自動スクロール
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  // モーダルを開く
  const handleOpenModal = () => setShowModal(true);

  // モーダルを閉じる
  const handleCloseModal = () => setShowModal(false);

  // プランを作成ボタン → resultに移動
  const handleCreatePlan = () => {
    router.push('/plan');
  };

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // ユーザーのメッセージを表示
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input.trim() }
    ]);

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: questions[currentQuestionIndex] }
        ]);
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500);
    }

    if (currentQuestionIndex === questions.length) {
      setTimeout(() => {
        router.push('/plan'); 
      }, 500);
    }

    setInput("");
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "#e0f7fa" }} >
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col">
        {/* チャットエリア */}
        <div className="w-full max-w-md h-full bg-white shadow-lg">

          {/* ヘッダー */}
          <div className="p-2 flex items-center border-b border-gray-300">
            <Image 
              src="/AIbot.png" 
              alt="Bot"
              width={48}
              height={48}
              className="rounded-full mr-2 w-12 h-12"
            />
            <h1 className="text-2xl font-bold">
              AI旅行プランナー
            </h1>
            <button 
              onClick={handleOpenModal} 
              className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              プランを作成
            </button>
          </div>

          {/* チャットエリア */}
          <div
            className="overflow-y-auto p-4"
            style={{
              height: `calc(100vh - ${inputHeight + 64}px)`,
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                {msg.sender === "bot" && (
                  <Image
                    src="/AIbot.png"
                    alt="Bot"
                    width={40}
                    height={40}
                    className="rounded-full mr-2 w-10 h-10 flex-shrink-0"
                  />
                )}
                <div className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-[#dcf8c6] text-black" : "bg-blue-100 text-gray-900"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* 入力エリア */}
          <div ref={inputContainerRef} className="p-2 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="メッセージを入力..."
              className="flex-1 p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              送信
            </button>
          </div>
        </div>

        {/* ポップアップ */}
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleCreatePlan}
        />
      </div> 
    </div>
  );
}
