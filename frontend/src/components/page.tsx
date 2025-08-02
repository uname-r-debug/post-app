import {
  Database,
  Inbox,
  LogOut,
  LucideAlignCenter,
  Trash as TrashIcon,
  Upload,
  Delete,
  User,
} from "lucide-react";
import {
  SidebarFooter,
  Sidebar,
  SidebarHeader,
  SidebarProvider,
  SidebarContent,
  SidebarMenuButton,
} from "./ui/sidebar";
import { useNavigate, useParams, type NavigateFunction } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import Trash from "./trash";
import Create from "./create";
import Index from "./index";
import DeleteComponent from "./delete";
import Update from "./update";
function match(view: string | undefined) {
  let markup: React.JSX.Element = <></>;
  switch (view) {
    case undefined:
      markup = (
        <div className="grid grid-cols-2 gap-4 p-6 h-[100%]">
          {[1, 2].map((n) => (
            <Card key={n}>
              <CardContent>
                <Skeleton className="h-20 flex items-center justify-center"></Skeleton>
              </CardContent>
            </Card>
          ))}
        </div>
      );
      break;
    case "Trash":
      markup = <Trash />;
      break;
    case "Index":
      markup = <Index />;
      break;
    case "Create":
      markup = <Create />;
      break;
    case "Delete":
      markup = <DeleteComponent />
      break;
    default://case "Update": {...}
      markup = <Update />
  }
  return markup;
}
const Page = () => {
  const Navigate: NavigateFunction = useNavigate();
  const view: string | undefined = useParams().context;
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader
          className="bg-border cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            Navigate("/1", { replace: true });
          }}
        >
          <LucideAlignCenter />
        </SidebarHeader>
        <SidebarContent className="gap-4">
          {[
            <Inbox key={"Index"} />,
            <Database key={"Create"} />,
            <Upload key={"Update"} />,
            <Delete key={"Delete"} />,
            <TrashIcon key={"Trash"} />,
          ]
            .map((icon) => {
              return function () {
                return (
                  <SidebarMenuButton
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const route: string = icon.key!;
                      Navigate("/1/" + route, { replace: true });
                    }}
                  >
                    {icon}
                    <div>{icon.key!}</div>
                  </SidebarMenuButton>
                );
              };
            })
            .map((f) => f())}
        </SidebarContent>
        <SidebarFooter className="bg-border">
          <SidebarMenuButton
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              Navigate("/", { replace: true });
            }}
          >
            <LogOut className="w-10 h-10 hover:text-primary" />
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <div className="grow flex flex-col">
        <div className="h-[10%] border flex justify-between items-center px-10">
          <div className="font-(family-name:--font-mono) text-xl">
            {view ?? "Home"}
          </div>
          <div className="flex items-center h-[100%]">
            {localStorage.getItem("user_email")! + " "}
            <User
              className="h-[50px] w-[50px] cursor-pointer hover:text-primary hover:animate-bounce"
              onClick={(e) => {
                e.preventDefault();
                Navigate("/1/Profile", { replace: true });
              }}
            />
          </div>
        </div>
        <div className="bg-border h-[90%]">{match(view)}</div>
      </div>
    </SidebarProvider>
  );
};
export default Page;
