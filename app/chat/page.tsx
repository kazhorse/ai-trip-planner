"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "../../components/modal";
import EndModal from "../../components/endmodal";

const questions = [
  "どこから出発しますか？",
  "行きたい場所は決まっていますか？",
  "旅行の予算はどれくらいですか？",
  "出発日時と帰宅日時、もしくは日帰りか何泊するかを教えてください？",
  "どの交通手段を使う予定ですか？（飛行機、電車、バス、車 など）",
  "誰と一緒に旅行しますか？（一人、友達、家族、恋人 など）",
  "長時間の移動は苦になりませんか、それともできるだけ移動は少なくしたいですか？",
  "美味しいものを食べたいですか、それとも観光メインがいいですか？",
  "今の気分に合う旅行は、のんびり過ごすのとアクティブに動くのどっちがいいですか？",
  "日常から離れてリフレッシュしたいですか、それとも新しい刺激を求めていますか？",
  "旅の雰囲気は、静かで落ち着いた感じと、ワクワクする賑やかな感じのどちらが理想ですか？",
  "最近、疲れていますか、それとも体を動かしてリフレッシュしたい気分ですか？",
];

export default function Home() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([{ sender: "bot", text: questions[0] }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState(80);
  const [showModal, setShowModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [userResponses, setUserResponses] = useState<string[]>([]);

  const inputContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseEndModal = () => setShowEndModal(false);

  const handleCreatePlan = () => {
    const qaPairs = questions.slice(0, userResponses.length).map((question, index) => ({
      question,
      answer: userResponses[index] || "",
    }));
    router.push(`/plan?qaPairs=${encodeURIComponent(JSON.stringify(qaPairs))}`);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: input.trim() }]);
    const updatedResponses = [...userResponses, input.trim()];
    setUserResponses(updatedResponses);

    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: questions[currentQuestionIndex] }]);
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowEndModal(true);
      }, 500);
    }

    setTimeout(() => {
      setInput("");
    }, 10);
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundColor: "#e0f7fa" }}
    >
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col">
        {/* チャット全体 */}
        <div className="w-full max-w-md h-full bg-white shadow-lg">
          {/* ヘッダー */}
          <div className="p-2 flex items-center border-b border-gray-300">
            <Image
              src="/odango.png"
              alt="Bot"
              width={48}
              height={48}
              className="rounded-full mr-2 w-12 h-12"
            />
            <h1 className="text-2xl font-bold">AI旅行プランナー</h1>
            <button
              onClick={handleOpenModal}
              className="ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              プランを作成
            </button>
          </div>

          {/* メッセージリスト */}
          <div
            className="overflow-y-auto p-4"
            style={{
              height: `calc(100vh - ${inputHeight + 64}px)`,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                {msg.sender === "bot" && (
                  <Image
                    src="/odango.png"
                    alt="Bot"
                    width={40}
                    height={40}
                    className="rounded-full mr-2 w-10 h-10 flex-shrink-0"
                  />
                )}
                <div
                  className={`p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#dcf8c6] text-black"
                      : "bg-blue-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* 入力欄 */}
          <div
            ref={inputContainerRef}
            className="p-2 border-t border-gray-300 flex items-center"
          >
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

        {/* モーダルたち */}
        <Modal isOpen={showModal} onClose={handleCloseModal} onConfirm={handleCreatePlan} />
        <EndModal isOpen={showEndModal} onClose={handleCloseEndModal} onConfirm={handleCreatePlan} />
      </div>
    </div>
  );
}
