import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { post } from '../lib/utils';
import { useNavigate } from "react-router";
export default function Trash() {
    const Navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        post(
            'http://localhost:8000/api/delete',
            {
                "email": localStorage.getItem("user_email")!,
                "user_id": localStorage.getItem("user_id")!
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": '*/*'
                }
            },
            response => {
                console.assert(response.status == 200);
                localStorage.removeItem("user_email");
                localStorage.removeItem("user_id");
                Navigate('/', { replace: true });
            },
            reason => console.warn(reason)
        );
    };

    return (
        <div className="h-[100%] p-10">
            <Card className="h-[inherit] justify-center">
                <CardHeader className="text-center">
                    <CardTitle>Delete your account?</CardTitle>
                    <CardDescription>Press the confirm button below to delete your account.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button className="cursor-pointer" onClick={handleClick}>Confirm</Button>
                </CardContent>
            </Card>
        </div>
    );
}