import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate, type NavigateFunction } from "react-router";
import { DEFAULT_POST_HEADERS, formInputs, post } from "@/lib/utils";
import React from "react";
import { CheckCircle } from "lucide-react";
import FlexLayout from "./layout/flex";
import GridLayout from "./layout/grid";
type FormData = {
  name: string;
  email: string;
  password: string;
};
export default function SignupForm(): React.JSX.Element {
  const Navigate: NavigateFunction = useNavigate();
  const [created, setCreated] = React.useState<boolean>(false);
  const [statusBar, setStatusBar] = React.useState<React.JSX.Element>(<></>);

  React.useEffect(() => {
    if (created)
      setStatusBar(
        <FlexLayout className="justify-end items-center">
          <CheckCircle className="size-10 text-primary animate-bounce" />
        </FlexLayout>,
      );
  }, [created]);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputs = (): Array<string> => formInputs(["name", "email", "password"])
      .map(
        value => value.trim()
      );
    const [_name, _email, _password] = inputs();

    post<FormData, { sessionKey: string }>(
      "http://localhost:8000/api/create",
      {
        name: _name,
        email: _email,
        password: _password,
      },
      DEFAULT_POST_HEADERS,
      (response) => {
        console.assert(response.status == 200);
        window.localStorage.clear();
        window.localStorage.setItem("sessionKey", response.data.sessionKey);
        window.localStorage.setItem("name", _name);
        setCreated(true);
      },
      (reason) => console.warn(reason),
    );
  };

  const FormMarkup = (): React.JSX.Element => (
    <form onSubmit={handleSignup}>
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" placeholder="John Doe" required />
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="m@example.com" required />
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="***" required />
      <Button type="submit" className="w-full mt-10 cursor-pointer">
        Submit
      </Button>
    </form>
  );

  return (
    <FlexLayout className="min-h-[inherit] font-[Geologica]">
      {/** */}
      <FlexLayout className="grow justify-center items-center">
        <FlexLayout id="wrapper" className="flex-col grow-[0.2]">
          {statusBar}
          <GridLayout className="grid-rows-1">
            <FlexLayout className="flex-col gap-2 p-4 bg-border rounded-xl">
              <div>Sign up for an account.</div>
              <div>Its Free!</div>
              {FormMarkup()}
              <Button
                type="button"
                className="w-full cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  Navigate("/", { replace: true });
                }}
              >
                Login
              </Button>
            </FlexLayout>
          </GridLayout>
        </FlexLayout>
      </FlexLayout>
    </FlexLayout>
  );
}
