import { FaEdit, FaTrash } from "react-icons/fa"; // Importing edit and delete icons
import { useContext } from "react"
import { DisplayContext } from "../contexts/DisplayContextProvider"
import { Gender, Occupation } from "../types/types";
import { UserListContext, UserListHandler } from "../contexts/UserListContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import { DefaultProfilePic } from "./DefaultProfilePic";
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
  phoneNumber: string;
  profilePic: File | null;
}

const titles = ["Name", "Gender", "Birthday", "Occupation", "Phone Number"];

// UserBoxTitle displays the user's information when the display is list.
const UserBoxTitle = () => {
  return (
    <div className="bg-red-600 text-white flex flex-col p-2 rounded-lg">
      <div className="grid grid-cols-5 justify-items-start">
        {titles.map((title) => (
          <span key={title} className="font-bold">{title}</span>
        ))}
      </div>
    </div>
  )
}

// UserBox is the main component that displays the user's information.
const UserBox = ({ id, name, gender, birthday, occupation, phoneNumber, profilePic }: UserBoxProps) => {
  const { display } = useContext(DisplayContext);
  const { toggleFormVisibility } = useContext(FormVisibilityContext);
  const { setIsBeingEdited } = useContext(UserContext);
  const userListHandler = useContext(UserListContext);
  //form fields
  const isGrid = display === "grid";

  const handleEdit = () => {
    toggleFormVisibility();
    setIsBeingEdited({ id, name, gender, birthday, occupation, phoneNumber, profilePic });
  };

  const handleDelete = (userListHandler: UserListHandler, id: number): void => {
    console.log("Deleting user with ID:", id);
    const updatedUserList = userListHandler.userList.filter((user) => user.id !== id);
    userListHandler.setUserList(updatedUserList); // Ensure this updates the state correctly
    console.log(updatedUserList);
  }
  
  console.log("profilePic of Userbox", profilePic);
  console.log("name of Userbox", name);


  return (  
    <div className={`bg-amber-500 flex flex-col p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
      <div className={`mb-8 ${isGrid ? 'flex justify-center' : 'hidden'}`}>
  {profilePic ? (
    <img 
      src={typeof profilePic === 'string' ? profilePic : URL.createObjectURL(profilePic)}
      alt="pfp not found" 
      className="w-48 h-48 rounded-xl border-2 border-white shadow-md" 
    />
  ) : (
    <DefaultProfilePic />
  )}
</div>
      {isGrid ? (
        <div className="grid grid-cols-3 gap-2 justify-items-start">
          {titles.map((title, index) => (
            <div className="flex flex-col items-start" key={index}>
              <span className='font-bold text-gray-800'>{title}</span>
              <span className="font-medium text-gray-700">{[name, gender, birthday, occupation, phoneNumber][index]}</span>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-5 gap-2 justify-items-start">
        { [name, gender, birthday, occupation, phoneNumber].map((value, index) => (
          <span key={index} className="font-medium text-gray-700">{value}</span>
        )) }
      </div>

      )}
      <div className={`flex flex-row justify-between mt-2`}>
        <FaEdit onClick={handleEdit} className="text-blue-600 w-6 h-6 hover:text-blue-800 transition-colors cursor-pointer" />
        <FaTrash onClick={() => handleDelete(userListHandler, id)} className="text-red-600 w-6 h-6 hover:text-red-800 transition-colors cursor-pointer" />
      </div>
    </div>
  )
}

export default UserBox
export { UserBoxTitle }