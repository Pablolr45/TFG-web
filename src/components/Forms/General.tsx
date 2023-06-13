import { TextField } from "@mui/material";
import Containerbox from "../Cards/ContainerBox";
import { ChangeEvent } from "react";

export default function General({
  titulo,
  subtitulo,
  handleEscapeRoom,
}: {
  titulo: string;
  subtitulo: string;
  handleEscapeRoom: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form className="flex flex-col gap-2">
      <Containerbox variants="secondary">
        <TextField
          label="Título"
          autoComplete="off"
          size="small"
          onChange={handleEscapeRoom}
          name="titulo"
          value={titulo}
        />
        <TextField
          label="SubTítulo"
          autoComplete="off"
          size="small"
          onChange={handleEscapeRoom}
          name="subtitulo"
          value={subtitulo}
        />
      </Containerbox>
      <Containerbox variants="secondary">
        
      </Containerbox>
    </form>
  );
}
