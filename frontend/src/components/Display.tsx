import { PaginationContext } from '../contexts/PaginationContextProvider';
import { DisplayContext } from '../contexts/DisplayContextProvider';
import { useContext } from "react";
import UserBox, { UserBoxTitle } from "./UserBox";
import UserForm from './UserForm';
import { UserState2 } from '../contexts/UserContextProvider';
import { UserListContext } from '../contexts/UserListContextProvider';

const Display = () => {
  const itemsPerPage = 6;
  const { currentPage, setTotalPages } = useContext(PaginationContext);
  const { display } = useContext(DisplayContext);
  const { userList } = useContext(UserListContext);

  // Fetching users from context or props to render multiple UserBoxes

  // liste de users
  const iconBoxes = userList.map((user: UserState2) => (
    <UserBox 
      key={user.id}
      id={user.id}
      name={user.name} 
      gender={user.gender} 
      birthday={user.birthday} 
      occupation={user.occupation} 
      phoneNumber={user.phoneNumber} 
      profilePic={user.profilePic} 
    />
  ));

  const totalPages = Math.ceil(iconBoxes.length / itemsPerPage);
  setTotalPages(totalPages);
  
  const startIndex = currentPage * itemsPerPage;
  const displayedIcons = iconBoxes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {display === "grid" ? (
        <div className="bg-red-100 grid grid-cols-3 grid-rows-2 rounded-lg p-2 gap-2 w-full h-full">
          <UserForm/>
          {displayedIcons}
        </div>
      ) : (
        <div className="bg-red-100 flex flex-col gap-2 rounded-lg p-2 w-full h-full">
          <UserBoxTitle/>
          {displayedIcons}
          <UserForm/>
        </div>
    )}
  </div>
  )
}

export default Display