import { FaEdit, FaTrash } from "react-icons/fa"; // Importing edit and delete icons

import { useContext } from "react"
import { DisplayContext } from "../contexts/DisplayContextProvider"
import { Gender, Occupation } from "../types/types";
import { UserListContext, UserListHandler } from "../contexts/UserListContextProvider";
/**
 * UserBox is the component that displays a user's information.
 * It is used in the Display component.
 * It can be displayed as a box or a list.
 * @returns A UserBox component.
 */

interface UserBoxProps {
  id: number;
  name: string;
  gender: Gender;
  birthday: string;
  occupation: Occupation;
  phoneNumber: number;
  profilePic: File | null;
}

// UserBoxTitle displays the user's information when the display is list.
const UserBoxTitle = () => {
  return (
    <div className="bg-red-600 text-white flex-col flex gap-2 p-2 rounded-lg">
      <div className="grid grid-cols-5 gap-4">
        <span className="font-bold justify-center">Name</span>
        <span className="font-bold justify-center">Gender</span>
        <span className="font-bold justify-center">Birthday</span>
        <span className="font-bold justify-center">Occupation</span>
        <span className="font-bold justify-center">Phone Number</span>
      </div>
    </div>
  )
}

// UserBox is the main component that displays the user's information.
const UserBox = ({ id, name, gender, birthday, occupation, phoneNumber, profilePic }: UserBoxProps) => {
  const { display } = useContext(DisplayContext);
  const userListHandler = useContext(UserListContext);
  //form fields
  const isGrid = display === "grid";

  const handleEdit = () => {}

  const handleDelete = (userListHandler: UserListHandler, id: number): void => {
    console.log("Deleting user with ID:", id);
    const updatedUserList = userListHandler.userList.filter((user) => user.id !== id);
    userListHandler.setUserList(updatedUserList); // Ensure this updates the state correctly
    console.log(updatedUserList);
  }

  return (  
    <div className="bg-amber-500 flex-col flex p-2 rounded-lg">
      <div>
        <img src={profilePic?.toString()} alt="Profile" className="w-sm h-sm rounded-md" />
      </div>
      <div>
        Name: <span className="font-bold">{name}</span>
      </div>
      <div>
        Gender: <span className="font-bold">{gender}</span>
      </div>
      <div>
        Birthday: <span className="font-bold">{birthday}</span>
      </div>
      <div>
        Occupation: <span className="font-bold">{occupation}</span>
      </div>
      <div>
        Phone Number: <span className="font-bold">{phoneNumber}</span>
      </div>
       
      <div className="flex justify-between">
        <FaEdit className="text-blue-500" />
        <FaTrash onClick={() => handleDelete(userListHandler, id)} className="text-red-500" />
      </div>
    </div>
  )
}

export default UserBox
export { UserBoxTitle }