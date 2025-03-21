import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({ isOpen, onClose, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg border border-gray-200">
        <p className="text-lg mb-4 text-gray-700">
          質問の途中ですが、この時点でプランを作成しますか？<br />
          最後までお答えいただくことで、よりあなたに合ったプランをご提案できます。
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            チャットに戻る
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            プランを作成
          </button>
        </div>
      </div>
    </div>
  );
}
