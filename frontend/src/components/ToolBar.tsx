import { FaUserPlus } from "react-icons/fa"
import { useContext, useEffect, useState} from "react";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import useDebounce from "../hooks/useDebounce";
import { UserListContext } from "../contexts/UserListContextProvider";

const AddUserButton = () => {
    const { toggleFormVisibility } = useContext(FormVisibilityContext);

    const handleButtonClick = () => {
        toggleFormVisibility();
    };

    return (
        <button 
          className="bg-amber-500 text-white p-2 rounded-md w-1/8 h-10 flex items-center justify-center" 
          onClick={handleButtonClick}
        >
          <FaUserPlus className="w-6 h-6" />
        </button>
    );
};

const SearchBar = () => {
  const { setUserList } = useContext(UserListContext);
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)

  useEffect(() => {fetchUsers(debouncedSearchValue)}, [debouncedSearchValue])

  const fetchUsers = async (query: string) => {
    const res = await fetch(`http://localhost:3000/users?search=${encodeURIComponent(query)}`)
    const data = await res.json()
    setUserList(data)
  }

  return (
    <div className="flex justify-center items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

const ToolBar = () => {
  return (
      <div className="flex gap-2 items-center">
        <AddUserButton />
        <SearchBar />
      </div>
  )
}

export { SearchBar, AddUserButton }
export default ToolBar