"use client";
import { useState } from "react";
import ContainerBox from "@/components/Cards/ContainerBox";
import { TextWithLabel } from "@/components/Texts";
import { Edit } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const MiCuenta = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <section className="grid grid-cols-3 gap-3">
      {/* Tarjeta de datos del usuario */}
      <ContainerBox span={2} variants="primary">
        <div className="grid grid-cols-[min-content_minmax(0,1fr)] items-center gap-3">
          <Avatar
            sx={{ width: 100, height: 100 }}
            className="bg-virtual-300 font-bold text-xl"
            alt="Pablo López Roda">
            PL
          </Avatar>
          <div>
            <TextWithLabel label="Nombre y Apellido">
              Pablo
            </TextWithLabel>
            <TextWithLabel label="Apellidos">
              López Roda
              </TextWithLabel>
              <TextWithLabel label="Asignatura">
              Desarrollo Entorno Servidor
              </TextWithLabel>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              endIcon={<Edit />}>
              Editar
            </Button>
          </div>
        </div>
      </ContainerBox>

      <ContainerBox variants="secondary">
        <div className="grid grid-cols-[min-content_minmax(0,1fr)] items-center gap-3">
          {/* <Avatar
            sx={{ width: 100, height: 100 }}
            className="bg-virtual-300 font-bold text-xl"
            alt="Pablo López Roda"
          >
            PL
          </Avatar> */}
          <div>
            <TextWithLabel label="Email">
              pablo@gmail.com
            </TextWithLabel>
            <TextWithLabel label="Contraseña">
              **********
            </TextWithLabel>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              endIcon={<Edit />}
            >
              Editar
            </Button>
          </div>
        </div>
      </ContainerBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Campos a editar
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            autoComplete="off"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="lastname"
            autoComplete="off"
            label="Apellidos"
            type="text"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="subject"
            autoComplete="off"
            label="Asignatura"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default MiCuenta;
