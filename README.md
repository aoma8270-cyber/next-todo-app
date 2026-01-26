# Next Tasks App

シンプルなタスク管理アプリケーション（Next.js + TypeScript）。

デプロイ済みデモ: https://next-todo-app-mu-seven.vercel.app/

**概要**
- タスクの追加、編集、完了、重要フラグ、削除が可能
- タグごとに色を表示
- Radix UI とカスタム UI コンポーネントを使用

**技術スタック**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI

**ローカル環境の起動方法**

1. 依存関係をインストール

```bash
npm install
```

2. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いて確認してください。

**ビルド**

```bash
npm run build
npm run start
```

**主要ファイル**
- `app/page.tsx` — アプリのエントリページ
- `app/components/` — UI コンポーネント群（`TabsMenu.tsx`, `TaskItem.tsx` など）
- `components/ui/` — 再利用可能な UI コンポーネント

**デプロイ**
- Vercel にデプロイ済み: https://next-todo-app-mu-seven.vercel.app/

**貢献**
- バグ報告・機能要望は Issue を立ててください。

**ライセンス**
- 特に指定がなければプロジェクトに適したライセンスを追加してください。

---

作成: Next Tasks App
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
