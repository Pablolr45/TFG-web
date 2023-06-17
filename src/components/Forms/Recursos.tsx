import { Button } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import AddIcon from "@mui/icons-material/Add";
import Recurso from "./Recurso";

export default function Recursos({ recursos }: { recursos: Array<any> }) {
  return (
    <form className="flex flex-col gap-2 h-full">
      <Containerbox flexCol title="RECURSOS" variants="secondary">
        <div className="flex justify-end">
          <Button startIcon={<AddIcon />}>Añadir</Button>
        </div>
        {/* Lista de los recursos agregados */}
        <div className="flex gap-2">
          {recursos.map((recurso: any) => {
            if (typeof recurso == "string") {
              return <Recurso key={recurso} bgColor="orange" icon={recurso} />;
            }
          })}
        </div>
      </Containerbox>
    </form>
  );
}
