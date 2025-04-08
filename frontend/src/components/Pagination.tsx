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

  const clickOnNextPage = () => { setCurrentPage(Math.min(totalPages - 1, currentPage + 1)) }
  const clickOnPreviousPage = () => { setCurrentPage(Math.max(0, currentPage - 1)) }

  const buttonClass = "text-gray-600 cursor-pointer disabled:text-gray-300";

  return (
    <div className="flex justify-center gap-4 items-center">
      <button 
        onClick={clickOnPreviousPage}
        disabled={currentPage === 0}
        className={buttonClass}
      >
        <FaArrowLeft />
      </button>
      <div>Page {currentPage + 1} of {totalPages}</div>
      <button
        onClick={clickOnNextPage}
        disabled={currentPage === totalPages - 1}
        className={buttonClass}
      >
        <FaArrowRight />
      </button>
    </div>
  )
}

export default Pagination;