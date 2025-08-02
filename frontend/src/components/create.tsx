import { post } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Create() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [content, subject] = ["content", "subject"].map((id) =>
      document.querySelector<HTMLInputElement>("#" + id)?.value.trim(),
    );
    post(
      "http://localhost:8000/api/create.post",
      {
        content: content!,
        subject: subject!,
        user_id: Number.parseInt(localStorage.getItem("user_id")!),
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      },
      (response) => console.log(response.data),
      (reason) => console.warn(reason),
    );
  };
  return (
    <div className="h-[inherit] flex items-center">
      <Card className="w-[80%] py-10 mx-auto">
        <CardHeader>
          <CardTitle>Create a post.</CardTitle>
          <CardDescription>
            Fill the fields below to create a post.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[90%]">
          <form
            className="h-[inherit] grid grid-cols-2 gap-5"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6 rounded-xl content-evenly">
              <CardTitle>Post Subject</CardTitle>
              <Input id="subject" type="text" required />
            </div>
            <div className="grid gap-6 rounded-xl content-evenly">
              <CardTitle>Post Content</CardTitle>
              <Input id="content" type="text" required />
            </div>
            <Button type="submit" className="col-span-2 cursor-pointer">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
