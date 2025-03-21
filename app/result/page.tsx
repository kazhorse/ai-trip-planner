export default function Result() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col">
        {/* ヘッダー */}
        <div className="p-2 flex justify-center border-b border-gray-300">
          <h1 className="text-2xl font-bold text-center">
            旅行プラン提案
          </h1>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto p-4 flex justify-center items-center">
          <p className="text-lg text-gray-700 text-center">
            ここに旅行プランを表示します
          </p>
        </div>
      </div>
    </div>
  );
}
