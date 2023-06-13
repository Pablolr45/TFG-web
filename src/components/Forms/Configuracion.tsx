import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent } from "react";

export default function Configuracion({
  cuentaAtras,
  puntuacion,
  minutos,
  restaPista,
  handleEscapeRoom,
  handleEscapeRoomToggle,
}: {
  cuentaAtras: boolean;
  puntuacion: boolean;
  minutos: number;
  restaPista: number;
  handleEscapeRoom: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEscapeRoomToggle: (name: string, value: boolean) => void;
}) {
  return (
    <form className="flex flex-col gap-2">
      <Containerbox variants="secondary">
        <ToggleButtonGroup
          color="primary"
          value={cuentaAtras}
          exclusive
          size="small"
          onChange={(e, value) => handleEscapeRoomToggle("cuentaAtras", value)}
          aria-label="Platform"
        >
          <ToggleButton value={true}>Con cuenta atrás</ToggleButton>
          <ToggleButton value={false}>Sin cuenta atrás</ToggleButton>
        </ToggleButtonGroup>
        {cuentaAtras && (
          <TextField
            value={minutos}
            size="small"
            label="Minutos"
            name="minutos"
            onChange={handleEscapeRoom}
          />
        )}
      </Containerbox>
      <Containerbox variants="secondary">
        <ToggleButtonGroup
          color="primary"
          value={puntuacion}
          exclusive
          size="small"
          onChange={(e, value) => handleEscapeRoomToggle("puntuacion", value)}
          aria-label="Platform"
        >
          <ToggleButton value={true}>Con puntuacion</ToggleButton>
          <ToggleButton value={false}>Sin puntuacion</ToggleButton>
        </ToggleButtonGroup>
        {puntuacion && (
          <TextField
            value={restaPista}
            size="small"
            label="Resta Pista"
            name="restaPista"
            onChange={handleEscapeRoom}
          />
        )}
      </Containerbox>
    </form>
  );
}
