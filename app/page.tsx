// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* ヘッダー */}
      <header className={styles.header}>
        <h1 className={styles.title}>AI旅行プランナー</h1>
        <button className={styles.button} onClick={() => alert('このアプリはAIを使って旅行プランを作成します！')}>
          アプリの説明
        </button>
      </header>

      {/* メインコンテンツ */}
      <main>
        <p>旅行プランを作成しましょう！</p>
        <button className={styles.planButton} onClick={() => router.push('/plan')}>
          旅行プラン作成
        </button>
      </main>
      </div>
  );
}

