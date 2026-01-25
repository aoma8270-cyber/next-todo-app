import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
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
    </>
  );
};

export default TabsMenu;
