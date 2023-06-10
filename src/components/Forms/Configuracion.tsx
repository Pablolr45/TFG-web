import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent } from "react";

export default function Configuracion({
  cuentaAtras,
  puntuacion,
  handleEscapeRoomToggle,
}: {
  cuentaAtras: boolean;
  puntuacion: boolean;
  handleEscapeRoomToggle: (name: string, value: boolean) => void;
}) {
  return (
    <form>
      <Containerbox variants="secondary">
        <ToggleButtonGroup
          color="primary"
          value={cuentaAtras}
          exclusive
          onChange={(e, value) =>
            handleEscapeRoomToggle("cuentaAtras", value)
          }
          aria-label="Platform"
        >
          <ToggleButton value={true}>Con cuenta atrás</ToggleButton>
          <ToggleButton value={false}>Sin cuenta atrás</ToggleButton>
        </ToggleButtonGroup>
      </Containerbox>
      <Containerbox variants="secondary">
        <ToggleButtonGroup
          color="primary"
          value={puntuacion}
          exclusive
          onChange={(e, value) =>
            handleEscapeRoomToggle("puntuacion", value)
          }
          aria-label="Platform"
        >
          <ToggleButton value={true}>Con puntuacion</ToggleButton>
          <ToggleButton value={false}>Sin puntuacion</ToggleButton>
        </ToggleButtonGroup>
      </Containerbox>
    </form>
  );
}
