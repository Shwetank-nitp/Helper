import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

function SnackbarContextProvider({ children }) {
  const [message, setMessage] = useState("");
  const [button, setButton] = useState({});
  const [severity, setSeverity] = useState("info");
  const [open, setOpen] = useState(false);
  return (
    <SnackbarContext.Provider
      value={{
        message,
        button,
        severity,
        open,
        setMessage,
        setButton,
        setSeverity,
        setOpen,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackBar = () => {
  return useContext(SnackbarContext);
};

export { SnackbarContextProvider };
