import { PaginationContext } from '../contexts/PaginationContextProvider';
import { DisplayContext } from '../contexts/DisplayContextProvider';
import { useContext } from "react";
import UserBox, { UserBoxTitle } from "./UserBox";
import UserForm from './UserForm';
import { UserState } from '../contexts/UserContextProvider';
import { UserListContext } from '../contexts/UserListContextProvider';

/**
 * Display is the component where all the actions are performed.
 * It's where the users' information is displayed and where the 
 * user can add a new user, edit or delete an existing user.
 * It appears in the Layout component.
 * @returns A Display component.
 */

const Display = () => {
  const itemsPerPage = 6;
  const { currentPage, setCurrentPage, setTotalPages } = useContext(PaginationContext);
  const { display } = useContext(DisplayContext);
  const { userList } = useContext(UserListContext);

  const iconBoxes = userList.map((user: UserState) => (
    <UserBox 
      key={user._id}
      name={user.name}
      gender={user.gender}
      birthday={user.birthday}
      occupation={user.occupation}
      phoneNumber={user.phoneNumber}
      profilePic={user.profilePic} 
      _id={user._id} />
  ));

  const totalPages = iconBoxes.length === 0 ? 1 : Math.ceil(iconBoxes.length / itemsPerPage);
  setTotalPages(totalPages);  
  const startIndex = currentPage * itemsPerPage;
  const displayedIcons = iconBoxes.slice(startIndex, startIndex + itemsPerPage);

  if (displayedIcons.length === 0) currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div>
      {display === "grid" ? (
        <div className="bg-blue-100 grid grid-cols-1 sm:grid-cols-3 grid-rows-2 rounded-lg p-2 gap-2 w-full h-full">
          <UserForm/>
          {displayedIcons}
        </div>
      ) : (
        <div className="bg-blue-100 flex flex-col gap-2 rounded-lg p-2 w-full h-full">
          <UserBoxTitle/>
          {displayedIcons}
          <UserForm/>
        </div>
    )}
  </div>
  )
}

export default Display