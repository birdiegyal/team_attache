import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export const Collections = () => {
  const navigate = useNavigate();
  const fileData = [
    { id: "api", title: "APIs" },
    { id: "ui", title: "UI" },
    { id: "graphics", title: "Graphics" },
  ];
  return (
    <div className="flex flex-col gap-4 mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-1/2">
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-4xl">Collections</CardTitle>
          <CardDescription>
            After creating the role, you need to create the collection for the
            respective roles.
          </CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <div className="min-h-[30vh] max-h-[30vh] overflow-y-auto rounded-md sm:min-h-[40vh] sm:max-h-[40vh]">
            <div className="flex justify-start items-center">
              {fileData.map((file) => (
                <div onClick={() => navigate(`${file.id}`)}>
                  <FileSvg height={150} width={150} title={file.title} />
                </div>
              ))}
            </div>
            <div className="mt-2"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface FileSvgProps {
  height: number;
  width: number;
  title: string;
}
function FileSvg({ height, width, title }: FileSvgProps) {
  return (
    <div className="cursor-pointer p-2">
      <svg
        width={width}
        height={height}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 2.5C3 2.22386 3.22386 2 3.5 2H9.29289L12 4.70711V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.60355C13 4.40464 12.921 4.21388 12.7803 4.07322L9.85355 1.14645C9.75979 1.05268 9.63261 1 9.5 1H3.5ZM5.25 7C4.97386 7 4.75 7.22386 4.75 7.5C4.75 7.77614 4.97386 8 5.25 8H9.75C10.0261 8 10.25 7.77614 10.25 7.5C10.25 7.22386 10.0261 7 9.75 7H5.25Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h1 className="text-center font-bold">{title}</h1>
    </div>
  );
}

export default FileSvg;
