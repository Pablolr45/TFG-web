import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import FlashlightOnIcon from "@mui/icons-material/FlashlightOn";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const Icon: Record<string, ReactJSXElement> = {
  Flashlight: <FlashlightOnIcon />,
  Notebook: <NoteAltIcon />,
};
const BgColor: Record<BgColorType, string> = {
  orange: "bg-orange-600",
  violet: "bg-violet-800",
};
type BgColorType = "orange" | "violet";

export default function Recurso({
  icon,
  bgColor,
}: {
  icon: any;
  bgColor: BgColorType;
}) {
  return (
    <div
      className={`${BgColor[bgColor]} p-3 w-12 h-12 rounded-md flex justify-center items-center`}
    >
      {Icon[icon]}
    </div>
  );
}
