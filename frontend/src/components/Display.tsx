import { PaginationContext } from '../contexts/PaginationContextProvider';
import { DisplayContext } from '../contexts/DisplayContextProvider';
import { useContext } from "react";
import UserBox, { UserBoxTitle } from "./UserBox";

const Display = () => {
  const itemsPerPage = 6;
  const { currentPage, setTotalPages } = useContext(PaginationContext);
  const { display } = useContext(DisplayContext);

  // Example array of IconBoxes - in real app this would likely come from props or context
  const iconBoxes = [
    <UserBox />,
  ];

  const totalPages = Math.ceil(iconBoxes.length / itemsPerPage);
  setTotalPages(totalPages);
  
  const startIndex = currentPage * itemsPerPage;
  const displayedIcons = iconBoxes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {display === "grid" ? (
        <div className="bg-red-100 grid grid-cols-3 grid-rows-2 rounded-lg p-2 gap-2 w-full h-full">
          {displayedIcons}
        </div>
      ) : (
        <div className="bg-red-100 flex flex-col gap-2 rounded-lg p-2 w-full h-full">
          <UserBoxTitle/>
          {displayedIcons}
        </div>
    )}
  </div>
  )
}

export default Display