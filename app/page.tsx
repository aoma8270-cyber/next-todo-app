"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Sidebar from "./components/SideBar";
import TabsMenu from "./components/TabsMenu";
import Header from "./components/Header";
import TaskModal from "./components/TaskModel";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: "low" | "medium" | "high";
  completed: boolean;
  important: boolean;
  tags?: string[];
};

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "テストタスク",
    description: "テストタスクの説明",
    due_date: "2026-01-30",
    priority: "medium",
    completed: false,
    important: false,
    tags: ["仕事"],
  },
  {
    id: "2",
    title: "テストタスク２",
    description: "テストタスク２の説明",
    due_date: "2026-02-08",
    priority: "high",
    completed: true,
    important: true,
    tags: ["個人"],
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

export type FilterType = "all" | "important" | "today" | "scheduled" | "tag";

export default function Home() {
  // タスクとタグの状態
  const [tasks, setTasks] = useState(sampleTasks);
  const [tags, setTags] = useState(sampleTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentEditTask, setCurrentEditTask] = useState<Task | undefined>(
    undefined,
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const handleTagFilter = (tagName: string) => {
    setCurrentFilter("tag");
    setSelectedTagName(tagName);
  };

  const getFilteredTasks = () => {
    let filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    switch (currentFilter) {
      case "important":
        filtered = filtered.filter((task) => task.important);
        break;
      case "today":
        filtered = filtered.filter((task) => task.due_date === todayStr);
        break;
      case "scheduled":
        filtered = filtered.filter(
          (task) => task.due_date && task.due_date !== "",
        );
        break;
      case "tag":
        filtered = filtered.filter((task) =>
          task.tags?.includes(selectedTagName || ""),
        );
        break;
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  const changeFilter = (filter: FilterType) => {
    setCurrentFilter(filter);

    if (filter === "all") {
      setSelectedTagName(null);
    }
  };

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

  const toggleTaskComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const toggleTaskImportantFlag = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task,
      ),
    );
  };

  const handleAddTask = (taskData: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: new Date().getTime().toString(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (!currentEditTask) return;
    setTasks(
      tasks.map((task) =>
        task.id === currentEditTask.id ? { ...task, ...taskData } : task,
      ),
    );
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (modalMode === "add") {
      handleAddTask(taskData);
    } else {
      handleEditTask(taskData);
    }
  };

  const openEditModal = (task: Task) => {
    setCurrentEditTask(task);
    setModalMode("edit");
    setIsTaskModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentEditTask(undefined);
    setModalMode("add");
    setIsTaskModalOpen(true);
  };

  const openDeleteDialog = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };



  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
        {/* ヘッダー */}
        <Header />
        <main className="mt-8">
          <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            {/* サイドバー */}
            <Sidebar
              currentFilter={currentFilter}
              tags={tags}
              selectedTagName={selectedTagName}
              handleTagFilter={handleTagFilter}
              changeFilter={changeFilter}
            />

            {/* メインコンテンツ */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {currentFilter === "all" && "すべてのタスク"}
                  {currentFilter === "important" && "重要なタスク"}
                  {currentFilter === "today" && "今日のタスク"}
                  {currentFilter === "scheduled" && "予定されたタスク"}
                  {currentFilter === "tag" &&
                    selectedTagname &&
                    `タグ: ${selectedTagname}`}
                </h2>
                <Button size="sm" className="gap-1" onClick={openAddModal}>
                  <Plus className="h-4 w-4" />
                  新しいタスク
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="タスクを検索..."
                  className="max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <TabsMenu
                tasks={filteredTasks}
                tagColors={tagColors}
                toggleTaskComplete={toggleTaskComplete}
                toggleTaskImportantFlag={toggleTaskImportantFlag}
                openEditModal={openEditModal}
                openDeleteDialog={openDeleteDialog}
              />
            </div>
            <TaskModal
              isOpen={isTaskModalOpen}
              onClose={() => setIsTaskModalOpen(false)}
              onSave={handleSaveTask}
              editTask={currentEditTask}
              mode={modalMode}
              availableTags={tags.map((tag) => tag.name)}
              tagColors={tagColors}
            />

            <DeleteConfirmDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => {setIsDeleteDialogOpen(false); setTaskToDelete(null);}}
              onConfirm={handleDeleteTask}
              title="タスクの削除"
              description="このタスクを本当に削除してもよろしいですか？この操作は元に戻せません。"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
