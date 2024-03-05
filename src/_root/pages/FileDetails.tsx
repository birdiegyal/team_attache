import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FileDetailsProps {
  fileId: string;
}

export const FileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Users details", id);
  const [assetData, setAssetData] = useState([
    { id: 1, title: "cone.jpg" },
    { id: 2, title: "logo.jpg" },
    { id: 3, title: "footer.svg" },
  ]);

  const handleDeleteRow = (rowIndex: number) => {
    setAssetData((prevData) =>
      prevData.filter((_, index) => index !== rowIndex)
    );
  };

  const handleRedirect = () => {
    navigate("/collectionSettings");
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Card className="rounded-md">
        <CardHeader className="flex justify-between items-center flex-row">
          <div>
            <CardTitle className="text-4xl">
              <span className="text-2xl text-gray-300">Collection ID:</span>{" "}
              {id}
            </CardTitle>
            <CardDescription>
              You can edit privileges and permissions of the data.
            </CardDescription>
          </div>
          <div>
            <Button
              variant="outline"
              className="px-4 py-1"
              onClick={handleRedirect}
            >
              Settings
            </Button>
          </div>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="min-h-[30vh] max-h-[30vh] overflow-y-auto rounded-md sm:min-h-[40vh] sm:max-h-[40vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SNo.</TableHead>
                  <TableHead>Assets</TableHead>
                  <TableHead className="text-right px-5">Settings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetData.map((asset, i) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{i + 1}</TableCell>
                    <TableCell className="truncate max-w-[40vw]">
                      {asset.title}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <Pencil1Icon className="h-3 w-3 mx-0" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36">
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteRow(i)}
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
