import { PiSquaresFourFill } from "react-icons/pi";
import { FaList } from "react-icons/fa6";
import { useContext } from "react";
import { DisplayContext } from "../contexts/DisplayContextProvider";
import { DisplayMode } from "../types/types";

/**
 * TabBar is the component to switch the Display's mode,
 * such as grid and list.
 * It appears in the Layout component.
 * @returns A TabBar component.
 */

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
            className={`cursor-pointer grow p-2 rounded-lg flex items-center justify-center ${isActive ? "bg-blue-500 text-white" : "bg-white border border-blue-500 text-blue-500"}`}
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
