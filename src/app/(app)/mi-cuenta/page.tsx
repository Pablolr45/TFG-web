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
            alt="Pablo López Roda"
          >
            PL
          </Avatar>
          <div>
            <TextWithLabel label="Nombre y Apellido">
              Pablo López Roda
            </TextWithLabel>
            <TextWithLabel label="Email">pablo@gmail.com</TextWithLabel>
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

      <ContainerBox variants="secondary">
        <div className="grid grid-cols-[min-content_minmax(0,1fr)] items-center gap-3">
          <Avatar
            sx={{ width: 100, height: 100 }}
            className="bg-virtual-300 font-bold text-xl"
            alt="Pablo López Roda"
          >
            PL
          </Avatar>
          <div>
            <TextWithLabel label="Nombre y Apellido">
              Pablo López Roda
            </TextWithLabel>
            <TextWithLabel label="Email">pablo@gmail.com</TextWithLabel>
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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            autocomplete="off"
            label="Email Address"
            type="email"
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
