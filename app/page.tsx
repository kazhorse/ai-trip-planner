'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image'; // ← これ追加！
import Header from '../components/header';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e0f7fa]">
      <div className="flex flex-col items-center justify-center text-center px-4 min-h-screen relative">
        <Header />

        <main>
          {/* AIbotの画像を表示 */}
          <div className="mb-6">
            <Image
              src="/odango.png"
              alt="AIボット"
              width={300}
              height={300}
              priority
              className="mx-auto rounded-full shadow-md border border-black"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI旅行プランナー
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            あなたにぴったりの旅行プランを提案します
          </p>

          <button
            onClick={() => router.push('/chat')}
            className="bg-blue-500 text-white px-8 py-3 text-lg rounded-lg shadow hover:bg-blue-600 transition"
          >
            旅行プランを作成
          </button>
        </main>
      </div>
    </div>
  );
}
