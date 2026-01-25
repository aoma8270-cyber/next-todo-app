import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

type Props = {
  tasks: {
    id: string;
    title: string;
    description: string;
    due_date: string;
    priority: string;
    completed: boolean;
    important: boolean;
    tags: string;
  }[];
  tagColors: Record<
    string,
    {
      color: string;
      textColor: string;
    }
  >;
};

const TabsMenu = ({ tasks, tagColors }: Props) => {
  const [currentTab, setCurrentTab] = useState("all");

  const allTasks = tasks;
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">すべて ({allTasks.length})</TabsTrigger>
        <TabsTrigger value="pending">未完了 ({pendingTasks.length})</TabsTrigger>
        <TabsTrigger value="completed">完了済み ({completedTasks.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-4">
        {allTasks.length > 0 ? (
          allTasks.map((task) => (
          <Card key={task.id} className="p-4">
            <CardHeader>タイトル：{task.title}</CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>内容：{task.description}</div>
              <div>期限：{task.due_date}</div>
              <div>ステータス：{task.completed ? "完了" : "未完了"}</div>
              <div>
                タグ：
                <span className={tagColors[task.tags]?.textColor || ""}>
                  {task.tags}
                </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          タスクが見つかりません
        </div>
      )}
      </TabsContent>
      <TabsContent value="pending" className="space-y-4">
        {pendingTasks.length > 0 ? (
           pendingTasks.map((task) => (
             <Card key={task.id} className="p-4">
               <CardHeader>タイトル：{task.title}</CardHeader>
               <CardContent className="text-sm text-muted-foreground">
                 <div>内容：{task.description}</div>
                 <div>期限：{task.due_date}</div>
                 <div>ステータス：{task.completed ? "完了" : "未完了"}</div>
                 <div>
                   タグ：
                   <span
                     className={`${tagColors[task.tags]?.textColor || ""}`}
                   >
                     {task.tags}
                   </span>
                 </div>
               </CardContent>
             </Card>
           ))
         ) : (
           <div className="text-center py-8 text-muted-foreground">
             未完了のタスクがありません
           </div>
         )}
       </TabsContent>
       <TabsContent value="completed" className="space-y-4">
         {completedTasks.length > 0 ? (
           completedTasks.map((task) => (
             <Card key={task.id} className="p-4">
               <CardHeader>タイトル：{task.title}</CardHeader>
               <CardContent className="text-sm text-muted-foreground">
                 <div>内容：{task.description}</div>
                 <div>期限：{task.due_date}</div>
                 <div>ステータス：{task.completed ? "完了" : "未完了"}</div>
                 <div>
                   タグ：
                   <span
                     className={`${tagColors[task.tags]?.textColor || ""}`}
                   >
                     {task.tags}
                   </span>
                 </div>
               </CardContent>
             </Card>
           ))
         ) : (
           <div className="text-center py-8 text-muted-foreground">
             完了済みのタスクがありません
           </div>
         )}
      </TabsContent>
    </Tabs>
    </>
  );
};

export default TabsMenu;
