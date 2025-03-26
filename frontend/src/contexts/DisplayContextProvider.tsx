import { createContext, useState } from "react";
import { DisplayMode } from "../types/types";

interface DisplayHandler {
    display: DisplayMode;
    setDisplay: React.Dispatch<DisplayMode>;
}

export const DisplayContext = createContext<DisplayHandler>(undefined as any);

const DisplayContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [display, setDisplay] = useState<DisplayMode>("grid");

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};

export default DisplayContextProvider;



