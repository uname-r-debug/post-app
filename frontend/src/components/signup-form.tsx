import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate, type NavigateFunction } from "react-router";
import { post } from "@/lib/utils";
import React from "react";
import { CheckCircle } from "lucide-react";

export default function SignupForm() {
  const Navigate: NavigateFunction = useNavigate();
  const [created, setCreated] = React.useState<boolean>(false);
  const [statusBar, setStatusBar] = React.useState<React.JSX.Element>(<></>);

  React.useEffect(() => {
    if (created)
      setStatusBar(
        <div className="flex justify-end pt-10">
          <CheckCircle className="text-primary animate-bounce mr-10 size-10" />
        </div>,
      );
  }, [created]);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputs = () =>
      ["name", "email", "password"].map((id) =>
        document.querySelector<HTMLInputElement>("#" + id)?.value.trim(),
      );
    const [_name, _email, _password] = inputs();

    post(
      "http://localhost:8000/api/create",
      {
        name: _name!,
        email: _email!,
        password: _password!,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      },
      (response) => {
        console.assert(response.status == 200);
        setCreated(true);
      },
      (reason) => console.warn(reason),
    );
  };

  return (
    <>
      {statusBar}
      <div className="flex items-center min-h-[inherit]">
        <Card className="w-128 mx-auto">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Sign up for an account.</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSignup}>

              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="..." required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="..."
                  type="password"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Button
                  type="submit"
                  className="cursor-pointer hover:bg-foreground hover:text-primary"
                >
                  Sign up
                </Button>
                <Button
                  className="cursor-pointer hover:bg-foreground hover:text-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    Navigate("/", { replace: true });
                  }}
                >
                  Log in
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
