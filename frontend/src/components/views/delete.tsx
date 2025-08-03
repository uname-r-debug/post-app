import { DEFAULT_POST_HEADERS, post } from "@/lib/utils";
import FlexLayout from "../layout/flex";
import GridLayout from "../layout/grid";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type PostData = {
    subject: string
};
export default function DeleteView(): React.JSX.Element {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        post<PostData, boolean>(
            "http://localhost:8000/api/delete.post",
            {
                subject: document.querySelector<HTMLInputElement>("#subject")!.value.trim(),
            },
            DEFAULT_POST_HEADERS,
            (response) => console.assert(response.status == 200 && response.data),
            reason => console.warn(reason)
        );
    };
    return (
        <FlexLayout className="justify-center items-center">
            <GridLayout className="grow-[0.5] bg-border grid-rows-[auto_1fr]">
                <FlexLayout className="justify-center">Delete a post.</FlexLayout>
                <FlexLayout className="flex-col gap-5">
                    <div className="text-center">Post subject.</div>
                    <Input
                        type="text"
                        id="subject"
                        required
                    />
                    <Button className="cursor-pointer" onClick={handleClick}>Delete Post.</Button>
                </FlexLayout>
            </GridLayout>
        </FlexLayout>
    );
}