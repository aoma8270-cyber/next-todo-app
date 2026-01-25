"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Sidebar from "./components/SideBar";
import TabsMenu from "./components/TabsMenu";

// タスクサンプルデータ
const sampleTasks = [
  {
    id: "1",
    title: "テストタスク",
    description: "テストタスクの説明",
    due_date: "2025-05-31",
    priority: "medium",
    completed: false,
    important: false,
    tags: "仕事",
  },
  {
    id: "2",
    title: "テストタスク２",
    description: "テストタスク２の説明",
    due_date: "2025-06-08",
    priority: "high",
    completed: true,
    important: true,
    tags: "個人",
  },
];

// タグサンプルデータ
const sampleTags = [
  {
    id: "1",
    name: "仕事",
    color: "bg-blue-100 dark:bg-opacity-75",
    text_color: "text-blue-700",
  },
  {
    id: "2",
    name: "個人",
    color: "bg-green-100 dark:bg-opacity-75",
    text_color: "text-green-700",
  },
];

export default function Home() {
  // タスクとタグの状態
  const [tasks, setTasks] = useState(sampleTasks);
  const [tags, setTags] = useState(sampleTags);

  // タグの色情報を取得
  const getTagColors = () => {
    const tagColors: Record<string, { color: string; textColor: string }> = {};

    tags.forEach((tag) => {
      tagColors[tag.name] = {
        color: tag.color,
        textColor: tag.text_color,
      };
    });

    return tagColors;
  };

  const tagColors = getTagColors();
  console.log("tagColors", tagColors);
  console.log("tags", tags);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
        {/* ヘッダー */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Next Tasks</h1>
          </div>
        </header>
        <main className="mt-8">
          <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            {/* サイドバー */}
            <Sidebar />

            {/* メインコンテンツ */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">すべてのタスク</h2>
                <Button size="sm" className="gap-1" onClick={() => {}}>
                  <Plus className="h-4 w-4" />
                  新しいタスク
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="タスクを検索..."
                  className="max-w-xs"
                  onChange={() => {}}
                />
              </div>
              <TabsMenu tasks={tasks} tagColors={tagColors} />
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}