import { Card, CardContent } from "@/components/ui/card";

const SideBar = () => {
  return (
    <div>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <nav className="grid gap-2">サイドバー</nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SideBar;
