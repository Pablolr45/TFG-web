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

const steps = ["General", "Configuración", "Presentación", "Recursos"];

export default function EscapeRoomLayout({}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [escapeRoom, setEscapeRoom] = React.useState<EscapeRoom>({
    titulo: "",
    subtitulo: "",
    sala: "",
    restaPistas: 0,
    puntuacion: true,
    cuentaAtras: true,
    minutos: 0,
    inicio: {
      tipo: "imagen",
      url: "",
    },
    final: {
      tipo: "imagen",
      url: "",
    },
  });

  const handleEscapeRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEscapeRoom({ ...escapeRoom, [e.target.name]: e.target.value });
  };

  const handleEscapeRoomToggle = <T,>(name: string, value: T) => {
    setEscapeRoom({ ...escapeRoom, [name]: value });
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
      <div>
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
              />
            )}
            {activeStep === 1 && (
              <Configuracion
                cuentaAtras={escapeRoom.cuentaAtras}
                puntuacion={escapeRoom.puntuacion}
                handleEscapeRoomToggle={handleEscapeRoomToggle<boolean>}
              />
            )}
            {activeStep === 2 && (
              <Presentacion
                cuentaAtras={escapeRoom.cuentaAtras}
                puntuacion={escapeRoom.puntuacion}
                handleEscapeRoomToggle={handleEscapeRoomToggle<boolean>}
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
