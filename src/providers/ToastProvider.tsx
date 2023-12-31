"use client";
import { Alert, Snackbar } from "@mui/material";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type Severity = "success" | "warning";
export interface ToastContext {
  setOpenToast: Dispatch<SetStateAction<boolean>>;
  setMessageToast: Dispatch<SetStateAction<string>>;
  setSeverityToast: Dispatch<SetStateAction<Severity>>;
}
export const ToastContext = createContext<ToastContext>({
  setOpenToast: function (value: SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
  setMessageToast: function (value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  setSeverityToast: function (value: SetStateAction<Severity>): void {
    throw new Error("Function not implemented.");
  }
});
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [openToast, setOpenToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [severityToast, setSeverityToast] = useState<Severity>("success");
  return (
    <ToastContext.Provider
      value={{ setOpenToast, setMessageToast, setSeverityToast }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={openToast}
        onClose={() => setOpenToast(false)}
        autoHideDuration={2000}
      >
        <Alert severity={severityToast}>{messageToast}</Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
