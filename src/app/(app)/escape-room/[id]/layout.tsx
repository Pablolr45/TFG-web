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
import Recursos from "@/components/Forms/Recursos";
import { EscapeRoomService } from "@/services/escape-room.service";
import { useParams } from "next/navigation";

const steps = ["General", "Configuración", "Presentación", "Recursos"];

export default function EscapeRoomLayout({}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { id } = useParams();
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  React.useEffect(() => {
    new EscapeRoomService()
      .getById(id)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setEscapeRoom(response);
      });
  }, []);
  const [escapeRoom, setEscapeRoom] = React.useState<EscapeRoom>({
    titulo: "",
    subtitulo: "",
    sala: "",
    restaPistas: 0,
    puntuacion: true,
    cuentaAtras: true,
    minutos: 0,
    recursos: ["Flashlight", "Notebook"],
    presentacionInicial: {
      tipo: "imagen",
      url: "",
    },
    presentacionFinal: {
      tipo: "imagen",
      url: "",
    },
  });
  console.log(escapeRoom);
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

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="py-5 flex flex-col gap-2">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
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
              />
            )}
            {activeStep === 2 && (
              <Presentacion
                presentacionInicial={escapeRoom.presentacionInicial}
                presentacionFinal={escapeRoom.presentacionFinal}
                handleEscapeRoomToggle={handleEscapeRoomTogglePresentacion}
                handleEscapeRoom={handleEscapeRoom}
              />
            )}
            {activeStep === 3 && <Recursos recursos={escapeRoom.recursos} />}
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
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
