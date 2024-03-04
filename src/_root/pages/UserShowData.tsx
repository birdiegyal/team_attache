import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export const UserShowData = () => {
  const navigate = useNavigate();

  const fileData = [
    { id: "api", title: "APIs" },
    { id: "ui", title: "UI" },
    { id: "graphics", title: "Graphics" },
  ];

  return (
    <div className="flex flex-row mt-4 mx-2 sm:w-2/3 sm:mx-auto md:w-[60%] text-left border-l border-r min-h-[95vh]">
      <div className="mx-5 my-8 text-left w-full">
        <h1 className="text-4xl my-5">My Data</h1>

        <div className="flex justify-start items-center">
          <h1 className="text-2xl my-65">Files</h1>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-start items-center">
          {fileData.map((file) => (
            <div onClick={() => navigate(`/userData/${file.id}`)}>
              <FileSvg height={150} width={150} title={file.title} />
            </div>
          ))}
        </div>
      </div>
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
