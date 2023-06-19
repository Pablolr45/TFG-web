"use client";
import { Step, StepButton, Stepper } from "@mui/material";
import { useEffect } from "react";

export default function StepperLabels({
  handleStep,
  activeStep,
  escapeRoom,
  handleComplete,
}: {
  handleComplete: (complete: boolean) => void;
  handleStep: (index: number) => () => void;
  activeStep: number;
  escapeRoom: EscapeRoom;
}) {
  useEffect(() => {
    switch (activeStep) {
      case 0:
        handleComplete(validate1());
        break;
      case 1:
        handleComplete(validate2());
        break;
      case 2:
        handleComplete(validate3());
        break;
    }
  });
  const validate1 = () => {
    if (escapeRoom.titulo === "") {
      return false;
    }
    if (escapeRoom.sala === "") {
      return false;
    }
    return true;
  };
  const validate2 = () => {
    if (escapeRoom.cuentaAtras) {
      if (escapeRoom.minutos == 0) {
        return false;
      }
    }
    if (escapeRoom.puntuacion) {
      if (escapeRoom.restaPistas == 0) {
        return false;
      }
    }
    return true;
  };
  const validate3 = () => {
    if (
      escapeRoom.presentacionInicial.url === "" ||
      escapeRoom.presentacionFinal.url === ""
    ) {
      return false;
    }
    return true;
  };
  return (
    <Stepper nonLinear activeStep={activeStep}>
      <Step completed={validate1()}>
        <StepButton color="inherit" onClick={handleStep(0)}>
          General
        </StepButton>
      </Step>
      <Step completed={validate2()}>
        <StepButton color="inherit" onClick={handleStep(1)}>
          Configuración
        </StepButton>
      </Step>
      <Step completed={validate3()}>
        <StepButton color="inherit" onClick={handleStep(2)}>
          Presentación
        </StepButton>
      </Step>
    </Stepper>
  );
}
