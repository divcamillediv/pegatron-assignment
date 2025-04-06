import { useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PaginationContext} from "../contexts/PaginationContextProvider";

/**
 * Pagination is the component to navigate through the
 * Display's pages.
 * It appears in the Layout component.
 * @returns A Pagination component.
 */

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(PaginationContext);

  return (
    <div className="flex justify-center gap-4 items-center">
      <button 
        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="text-gray-600 disabled:text-gray-300"
      >
        <FaArrowLeft />
      </button>
      <div>Page {currentPage + 1}/{totalPages}</div>
      <button
        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        className="text-gray-600 disabled:text-gray-300"
      >
        <FaArrowRight />
      </button>
    </div>
  )
}

export default Pagination;