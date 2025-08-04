import FlexLayout from "../layout/flex";
import GridLayout from "../layout/grid";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DEFAULT_POST_HEADERS, formInputs, post } from "@/lib/utils";
const gridClasses: string = "grid-cols-[auto] gap-2";
interface PostData {
    subject: string,
    content: string,
    user: number
};
export default function CreateView(): React.JSX.Element {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const [_subject, _content]: Array<string> = formInputs(["subject", "content"])
            .map(value => value.trim());
        post<PostData, boolean>(
            "http://localhost:8000/api/create.post",
            {
                subject: _subject,
                content: _content,
                user: Number.parseInt(window.localStorage.user!)
            },
            DEFAULT_POST_HEADERS,
            (response) =>
                console.assert(response.status == 200 && response.data),
            (reason) =>
                console.warn(reason)
        );
    };
    return (
        <FlexLayout className="justify-center items-center">
            <FlexLayout className="items-center bg-border grow-[0.5] rounded-xl">
                <form className="grow flex flex-col p-10 gap-5" onSubmit={handleSubmit}>
                    <FlexLayout className="bg-accent justify-center items-center">Create A Post!</FlexLayout>
                    <GridLayout className={gridClasses}>
                        <div>Post Subject.</div>
                        <Input
                            type="text"
                            id="subject"
                            required
                        />
                    </GridLayout>
                    <GridLayout className={gridClasses}>
                        <div>Post content.</div>
                        <Input
                            type="text"
                            id="content"
                            required
                        />
                    </GridLayout>
                    <Button type="submit" className="cursor-pointer">Create</Button>
                </form>
            </FlexLayout>
        </FlexLayout>
    )
}