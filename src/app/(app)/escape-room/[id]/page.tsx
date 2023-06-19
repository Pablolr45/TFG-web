"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import General from "@/components/Forms/General";
import Configuracion from "@/components/Forms/Configuracion";
import Presentacion from "@/components/Forms/Presentacion";
import { EscapeRoomService } from "@/services/escape-room.service";
import { useParams, useRouter } from "next/navigation";
import { ToastContext } from "@/providers/ToastProvider";
import { useContext, useState } from "react";
import StepperLabels from "@/components/Stepper/StepperLabel";

const steps = ["General", "Configuración", "Presentación"];

export default function EscapeRoomLayout({}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const { id } = useParams();
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({
    3: true,
  });
  React.useEffect(() => {
    if (id !== "nuevo") {
      new EscapeRoomService()
        .getById(id)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setEscapeRoom(response);
        });
    }
  }, [id]);
  const [escapeRoom, setEscapeRoom] = React.useState<EscapeRoom>({
    titulo: "",
    subtitulo: "",
    sala: "",
    restaPistas: 0,
    puntuacion: true,
    cuentaAtras: true,
    minutos: 0,
    presentacionInicial: {
      tipo: "imagen",
      url: "",
    },
    presentacionFinal: {
      tipo: "imagen",
      url: "",
    },
  });
  const create = () => {
    new EscapeRoomService()
      .create(escapeRoom)
      .then((response) => {
        if (!response.ok) {
          setSeverityToast("warning");
          setMessageToast("Ha ocurrido algun error");
          setOpenToast(true);
        }
        return response.json();
      })
      .then((response) => {
        setSeverityToast("success");
        setMessageToast("Escape Room creado");
        setOpenToast(true);
        console.log(response);
        router.push(`/escape-room/${response._id}`);
      });
  };
  const { setOpenToast, setMessageToast, setSeverityToast } =
    useContext<ToastContext>(ToastContext);
  const update = () => {
    new EscapeRoomService()
      .update(id, escapeRoom)
      .then((response) => {
        if (!response.ok) {
          setSeverityToast("warning");
          setMessageToast("Ha ocurrido algun error");
          setOpenToast(true);
        }
        return response.json();
      })
      .then((response) => {
        setSeverityToast("success");
        setMessageToast("Escape Room actualizado");
        setOpenToast(true);
      });
  };
  const deleteEscapeRoom = () => {
    new EscapeRoomService()
      .delete(id)
      .then((response) => {
        if (!response.ok) {
          setSeverityToast("warning");
          setMessageToast("Ha ocurrido algun error");
          setOpenToast(true);
        }
        return response.json();
      })
      .then((response) => {
        setSeverityToast("success");
        setMessageToast("Escape Room eliminado");
        setOpenToast(true);
        router.push("mis-escape-rooms");
      });
  };
  const handleEscapeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEscapeRoom({ ...escapeRoom, [e.target.name]: e.target.value });
  };

  const handleEscapeRoomToggle = <T,>(name: string, value: T) => {
    setEscapeRoom({ ...escapeRoom, [name]: value });
  };
  const handleEscapeRoomTogglePresentacion = <T,>(
    name: string,
    value: string,
    option: 1 | 2
  ) => {
    if (option === 1) {
      setEscapeRoom({
        ...escapeRoom,
        presentacionInicial: {
          ...escapeRoom.presentacionInicial,
          [name]: value,
        },
      });
    }
    if (option === 2) {
      setEscapeRoom({
        ...escapeRoom,
        presentacionFinal: {
          ...escapeRoom.presentacionFinal,
          [name]: value,
        },
      });
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = (complete: boolean) => {
    const newCompleted = completed;
    newCompleted[activeStep] = complete;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleSala = (value: string) => {
    setEscapeRoom({ ...escapeRoom, sala: value });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <StepperLabels
        handleComplete={handleComplete}
        activeStep={activeStep}
        escapeRoom={escapeRoom}
        handleStep={handleStep}
      />
      <div className="py-5 flex flex-col gap-2">
        <React.Fragment>
          {activeStep === 0 && (
            <General
              handleEscapeRoom={handleEscapeRoom}
              titulo={escapeRoom.titulo}
              subtitulo={escapeRoom.subtitulo}
              sala={escapeRoom.sala}
              handleSala={handleSala}
            />
          )}
          {activeStep === 1 && (
            <Configuracion
              cuentaAtras={escapeRoom.cuentaAtras}
              puntuacion={escapeRoom.puntuacion}
              minutos={escapeRoom.minutos}
              restaPistas={escapeRoom.restaPistas}
              handleEscapeRoom={handleEscapeRoom}
              handleEscapeRoomToggle={handleEscapeRoomToggle<boolean>}
              handleComplete={handleComplete}
            />
          )}
          {activeStep === 2 && (
            <Presentacion
              presentacionInicial={escapeRoom.presentacionInicial}
              presentacionFinal={escapeRoom.presentacionFinal}
              handleEscapeRoomToggle={handleEscapeRoomTogglePresentacion}
              handleEscapeRoom={handleEscapeRoom}
              handleComplete={handleComplete}
            />
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {id === "nuevo" ? <Button onClick={create}>Crear</Button> : ""}
            {allStepsCompleted() && id !== "nuevo" ? (
              <Button onClick={update} sx={{ mr: 1 }}>
                Actualizar
              </Button>
            ) : (
              ""
            )}
            {id !== "nuevo" ? (
              <div className="flex space-x-2">
                <Button onClick={deleteEscapeRoom} sx={{ mr: 1 }}>
                  Delete
                </Button>
              </div>
            ) : (
              ""
            )}
          </Box>
        </React.Fragment>
      </div>
    </Box>
  );
}
