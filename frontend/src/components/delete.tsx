import { Button } from "./ui/button";
import { CardDescription, CardHeader, CardTitle } from "./ui/card";
import { post } from "@/lib/utils";
import { Input } from "./ui/input";
export default function DeleteComponent() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    post(
      "http://localhost:8000/api/delete.post",
      {
        subject: document.querySelector<HTMLInputElement>("#subject")?.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      },
      (response) => {
        console.assert(response.status == 200);
      },
      (reason) => console.warn(reason),
    );
  };

  return (
    <div className="h-[100%] flex py-10">
      <form className="flex gap-4 rounded-xl mx-auto w-[80%]">
        <div className="rounded-xl flex flex-col gap-6 justify-center px-3 bg-accent">
          <CardTitle className="text-center">Post subject.</CardTitle>
          <Input type="text" required className="" id="subject" />
        </div>
        <div className="bg-accent flex items-center rounded-xl grow">
          <div className="grow grid gap-10 w-fit text-center">
            <CardHeader className="gap-2">
              <CardTitle>Delete post?</CardTitle>
              <CardDescription>
                Press the button below to delete the post.
              </CardDescription>
            </CardHeader>
            <Button onClick={handleClick} className="cursor-pointer mx-10">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
