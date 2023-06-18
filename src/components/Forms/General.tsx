import { TextField } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent, useEffect } from "react";
import EscapeRoomList from "../EscapeRoomLists/EscapeRoomList";

export default function General({
  titulo,
  subtitulo,
  sala,
  handleEscapeRoom,
  handleSala,
}: {
  titulo: string;
  subtitulo: string;
  sala: string;
  handleEscapeRoom: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSala: (value: string) => void;
}) {
  return (
    <form className="flex flex-col gap-2 h-full">
      <Containerbox flexCol title="TÍTULO Y SUBTÍTULO" variants="secondary">
        <div className="flex flex-row gap-2">
          <TextField
            label="Título"
            autoComplete="off"
            size="small"
            required
            onChange={handleEscapeRoom}
            name="titulo"
            value={titulo}
          />

          <TextField
            label="Subtítulo"
            autoComplete="off"
            size="small"
            onChange={handleEscapeRoom}
            name="subtitulo"
            value={subtitulo}
          />
        </div>
      </Containerbox>
      <Containerbox flexCol title="SALA" variants="secondary">
        <EscapeRoomList value={sala} handleValue={handleSala}></EscapeRoomList>
      </Containerbox>
    </form>
  );
}
