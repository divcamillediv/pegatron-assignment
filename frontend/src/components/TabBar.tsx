import { PiSquaresFourFill } from "react-icons/pi";
import { FaList } from "react-icons/fa6";
import { useContext } from "react";
import { DisplayContext } from "../contexts/DisplayContextProvider";
import { DisplayMode } from "../types/types";

interface Tab {
  icon: React.ReactNode;
  mode: DisplayMode;
}

const TabBar = () => {
  const { display, setDisplay } = useContext(DisplayContext);
  
  const tabs: Tab[] = [
    { icon: <PiSquaresFourFill />, mode: "grid" },
    { icon: <FaList />, mode: "list" }
  ];

  return (
    <div className="flex justify-between gap-2">
      {tabs.map((tab, index) => {
        const isActive = display === tab.mode;
        return (
          <div 
            key={index} 
            className={`grow p-2 rounded-lg flex items-center justify-center ${isActive ? "bg-blue-400 text-white" : "bg-white border border-blue-400 text-blue-400"}`}
            onClick={() => setDisplay(tab.mode)}
          >
            {tab.icon}
          </div>
        );
      })}
    </div>
  )
}

export default TabBar
