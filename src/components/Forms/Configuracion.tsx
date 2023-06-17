import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent } from "react";

export default function Configuracion({
  cuentaAtras,
  puntuacion,
  minutos,
  restaPistas,
  handleEscapeRoom,
  handleEscapeRoomToggle,
}: {
  cuentaAtras: boolean;
  puntuacion: boolean;
  minutos: number;
  restaPistas: number;
  handleEscapeRoom: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEscapeRoomToggle: (name: string, value: boolean) => void;
}) {
  return (
    <form className="flex flex-col gap-2">
      <Containerbox flexCol title="CUENTA ATRÁS" variants="secondary">
        <div className="flex flex-row gap-2">
          <ToggleButtonGroup
            color="primary"
            value={cuentaAtras}
            exclusive
            size="small"
            onChange={(e, value) =>
              handleEscapeRoomToggle("cuentaAtras", value)
            }
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
              type="Number"
              onChange={handleEscapeRoom}
            />
          )}
        </div>
      </Containerbox>
      <Containerbox flexCol title="PUNTUACIÓN" variants="secondary">
        <div className="flex flex-row gap-2">
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
              value={restaPistas}
              size="small"
              label="Resta Pista"
              name="restaPistas"
              type="Number"
              onChange={handleEscapeRoom}
            />
          )}
        </div>
      </Containerbox>
    </form>
  );
}
