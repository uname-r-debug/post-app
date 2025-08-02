import { post } from "@/lib/utils";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
type ResponseData = {
  id: number;
  content: string;
  subject: string;
};
export default function Index() {
  const [data, setData] = React.useState<[ResponseData] | []>([]);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    post(
      "http://localhost:8000/api/index",
      {
        user_id: localStorage.getItem("user_id"),
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      (response) => {
        console.log("rendered");
        setData(response.data as [ResponseData]);
      },
      (reason) => console.warn(reason),
    );
  };

  //React.useEffect(() => console.log(data), [data]);
  return (
    <div className="flex justify-center">
      <Table className="grow">
        <TableHeader>
          <TableRow>
            {["#", "Subject", "Content"].map((content) => (
              <TableHead key={content[0]} className="text-center">
                {content}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ id, subject, content }) => (
            <TableRow key={id}>
              <TableCell className="text-center">{id}</TableCell>
              <TableCell className="text-center">{subject}</TableCell>
              <TableCell className="text-center overflow-hidden">
                {content}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
        <TableCaption className="cursor-pointer" onClick={handleClick}>
          View Posts.
        </TableCaption>
      </Table>
    </div>
  );
}
