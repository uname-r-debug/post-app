import {
  Database,
  Inbox,
  LogOut,
  LucideAlignCenter,
  Trash,
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
import Index from "./index";
import Update from "./update";
import FlexLayout from "./layout/flex";
import GridLayout from "./layout/grid";
import React from "react";
import HomeView from "./views/home";
import CreateView from "./views/create";
import TrashView from "./views/trash";
import DeleteView from "./views/delete";
function match(view: string | undefined) {
  let markup: React.JSX.Element = <></>;
  switch (view) {
    case undefined:
      markup = <HomeView />;
      break;
    case "Trash":
      markup = <TrashView />;
      break;
    case "Index":
      markup = <Index />;
      break;
    case "Create":
      markup = <CreateView />;
      break;
    case "Delete":
      markup = <DeleteView />;
      break;
    default: //case "Update": {...}
      markup = <Update />;
  }
  return markup;
}

const Page = () => {
  const Navigate: NavigateFunction = useNavigate();
  const view: string | undefined = useParams().context;
  const PageLayout = (): React.JSX.Element => (
    <GridLayout className="grow grid-rows-[auto_1fr] bg-accent">
      <FlexLayout className="justify-between bg-border">
        <div>{view ?? "Home"}</div>
        <GridLayout className="grow-[0.1] grid-cols-2 justify-items-center items-center">
          <div>{window.localStorage.email}</div>
          <User />
        </GridLayout>
      </FlexLayout>
      {match(view)}
    </GridLayout>
  );
  const SidebarLayout = (): React.JSX.Element => (
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
          <Trash key={"Trash"} />,
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
  );
  return (
    <SidebarProvider className="font-[Geologica]">
      {SidebarLayout()}
      {PageLayout()}
    </SidebarProvider>
  );
};
export default Page;
