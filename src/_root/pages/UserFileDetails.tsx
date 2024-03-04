import { CardDescription } from "@/components/ui/card";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserFileDetailsProps {
  fileId: string;
}

export const UserFileDetails = () => {
  const { uid } = useParams();

  const userData = [
    { id: 1, title: "cone.jpg", date: "24/02/2024" },
    { id: 2, title: "logo.jpg", date: "28/02/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
    { id: 3, title: "footer.svg", date: "02/03/2024" },
  ];

  console.log("Users details", uid);

  return (
    <div className="flex flex-row mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-[60%] text-left border-l border-r min-h-[95vh]">
      <div className="mx-5 w-full my-8">
        <h1 className="text-4xl">
          <span className="text-2xl text-gray-300">Collection ID:</span> {uid}
          <CardDescription>
            It includes all the files and data related to the collection:{" "}
            <b>"{uid}"</b>
          </CardDescription>
        </h1>
        <div className="w-full my-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SNo.</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead className="text-right px-5">Date Modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((asset, i) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium cursor-pointer">
                    {i + 1}
                  </TableCell>
                  <TableCell className="truncate max-w-[40vw] cursor-pointer">
                    {asset.title}
                  </TableCell>
                  <TableCell className="text-right px-5 cursor-pointer">
                    {asset.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
