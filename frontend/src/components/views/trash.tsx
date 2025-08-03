import { Button } from "../ui/button";
import { DEFAULT_POST_HEADERS, post } from "../../lib/utils";
import { useNavigate, type NavigateFunction } from "react-router";
import FlexLayout from "../layout/flex";
import GridLayout from "../layout/grid";
type PostData = {
  user: number,
  sessionKey: string
};
export default function TrashView() {
  const Navigate: NavigateFunction = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    post<PostData, boolean>(
      "http://localhost:8000/api/delete",
      {
        user: Number.parseInt(window.localStorage.user!),
        sessionKey: window.localStorage.sessionKey
      },
      DEFAULT_POST_HEADERS,
      (response) => {
        console.assert(response.status == 200 && response.data);
        window.localStorage.clear();
        Navigate("/", { replace: true });
      },
      (reason) => console.warn(reason),
    );
  };

  return (
    <FlexLayout className="justify-center items-center">
      <FlexLayout className="flex-col bg-border rounded-xl gap-10  p-10">
        <GridLayout>
          <div>Delete your account?</div>
          <div>
            Press the confirm button below to delete your account.
          </div>
        </GridLayout>
        <GridLayout>
          <Button className="cursor-pointer" onClick={handleClick}>
            Confirm
          </Button>
        </GridLayout>
      </FlexLayout>
    </FlexLayout>
  );
}
