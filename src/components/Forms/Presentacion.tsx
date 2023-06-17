import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent } from "react";

export default function Presentacion({
  presentacionInicial,
  presentacionFinal,
  handleEscapeRoom,
  handleEscapeRoomToggle,
}: {
  presentacionInicial: PresentacionInicial;
  presentacionFinal: PresentacionFinal;
  handleEscapeRoom: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEscapeRoomToggle: (name: string, value: string, option: 1 | 2) => void;
}) {
  return (
    <form className="flex flex-col gap-2">
      <Containerbox flexCol title="PRESENTACIÓN INICIAL" variants="secondary">
        <div className="flex flex-row gap-2">
          <ToggleButtonGroup
            color="primary"
            value={presentacionInicial.tipo}
            exclusive
            size="small"
            onChange={(e, value) => handleEscapeRoomToggle("tipo", value, 1)}
            aria-label="Platform"
          >
            <ToggleButton value={"imagen"}>Imagen</ToggleButton>
            <ToggleButton value={"video"}>Video</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            value={presentacionInicial.url}
            size="small"
            name="urlPresentacionInicial"
            onChange={(e) => handleEscapeRoomToggle("url", e.target.value, 1)}
            label="Url del recurso"
          />
        </div>
      </Containerbox>
      <Containerbox flexCol title="PRESENTACIÓN FINAL" variants="secondary">
        <div className="flex flex-row gap-2">
          <ToggleButtonGroup
            color="primary"
            value={presentacionFinal.tipo}
            size="small"
            exclusive
            onChange={(e, value) => handleEscapeRoomToggle("tipo", value, 2)}
            aria-label="Platform"
          >
            <ToggleButton value={"imagen"}>Imagen</ToggleButton>
            <ToggleButton value={"video"}>Video</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            size="small"
            value={presentacionFinal.url}
            onChange={(e) => handleEscapeRoomToggle("url", e.target.value, 2)}
            name="urlPresentacionFinal"
            label="Url del recurso"
          />
        </div>
      </Containerbox>
    </form>
  );
}
