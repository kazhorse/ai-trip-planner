// app/plan/page.tsx
'use client'; // クライアントコンポーネントとして設定

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Plan.module.css';

export default function Plan() {
  const router = useRouter();
  
  // 旅行プランのデータ（仮）
  const destination = "沖縄";
  const schedule = [
    { day: 1, activity: "到着・国際通り散策" },
    { day: 2, activity: "美ら海水族館 & 古宇利島観光" },
    { day: 3, activity: "首里城 & ひめゆりの塔見学" },
    { day: 4, activity: "ビーチリゾートでのんびり" },
    { day: 5, activity: "お土産購入・帰宅" }
  ];

  // Google カレンダー用のURL生成
  const handleAddToCalendar = () => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = `沖縄旅行プラン`;
    const details = schedule.map((item) => `Day ${item.day}: ${item.activity}`).join("%0A");
    const location = destination;
    const startDate = "20250401"; // 仮の日程 YYYYMMDD
    const endDate = "20250405"; // 仮の日程 YYYYMMDD

    const googleCalendarUrl = `${baseUrl}&text=${encodeURIComponent(text)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className={styles.container}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <h1 className={styles.title}>旅行プラン提案</h1>
        <button className={styles.button} onClick={() => router.push('/')}>
          ホームに戻る
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className={styles.content}>
        <h2>こんな旅行プランはいかがですか？</h2>
        <h3>行先: {destination}</h3>
        
        <ul className={styles.schedule}>
          {schedule.map((item) => (
            <li key={item.day}>
              <strong>Day {item.day}:</strong> {item.activity}
            </li>
          ))}
        </ul>

        <button className={styles.addCalendarButton} onClick={handleAddToCalendar}>
          Google カレンダーに追加
        </button>
      </main>
    </div>
  );
}
