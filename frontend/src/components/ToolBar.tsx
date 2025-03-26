import { FaSearch } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa"

const AddUserButton = () => {
    return (
      <button className="bg-amber-500 text-white p-2 rounded-md w-1/8 flex items-center justify-center">
        <FaUserPlus className="w-6 h-6" />
      </button>
    )
  }

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        <FaSearch className="w-6 h-6"/>
      </button>
    </div>
  )
}

const ToolBar = () => {
  return (
    <div className="flex gap-2">
      <AddUserButton />
      <SearchBar />
    </div>
  )
}

export { SearchBar, AddUserButton }
export default ToolBar