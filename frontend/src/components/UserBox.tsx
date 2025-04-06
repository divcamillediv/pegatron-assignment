import { FaEdit, FaTrash } from "react-icons/fa"; // Importing edit and delete icons
import { useContext } from "react"
import { DisplayContext } from "../contexts/DisplayContextProvider"
import { Gender, Occupation } from "../types/types";
import { UserListContext } from "../contexts/UserListContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";

/**
 * UserBox is the component that displays a user's information.
 * It is used in the Display component.
 * It can be displayed as a box or a list.
 * @returns A UserBox component.
 */

interface UserBoxProps {
  _id: string;
  name: string;
  gender: Gender;
  birthday: string;
  occupation: Occupation;
  phoneNumber: string;
  profilePic: string;
}

const titles = ["Name", "Gender", "Birthday", "Occupation", "Phone Number"];

/**
 * UserBoxTitle displays the user's information categories 
 * at the top of the list when the display is list.
 */

const UserBoxTitle = () => {
  return (
    <div className="bg-pink-600 text-white flex flex-col p-2 rounded-lg">
      <div className="grid grid-cols-3 truncate sm:grid-cols-5 justify-items-start">
        {titles.map((title) => (
          <span key={title} className="font-bold">{title}</span>
        ))}
      </div>
    </div>
  )
}

// UserBox is the main component that displays the user's information.
const UserBox = ({ _id, name, gender, birthday, occupation, phoneNumber, profilePic }: UserBoxProps) => {
  const { display } = useContext(DisplayContext);
  const { setIsBeingEdited } = useContext(UserContext);
  const { setUserList } = useContext(UserListContext);
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  const isGrid = display === "grid";
  const formattedBirthday = new Date(birthday).toISOString().split("T")[0];

  const handleEdit = (_id: string) => {
    toggleFormVisibility();
    setIsBeingEdited({ _id, name, gender, birthday, occupation, phoneNumber, profilePic });
  };

  const handleDelete = async (_id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/users/${_id}`, {
        method: "DELETE",
      });
      console.log("Response:", response);
      if (response.ok) {
        setUserList((prevUsers) => prevUsers.filter((user) => user._id !== _id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (  
    <div className={`bg-blue-300 flex flex-col p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105`}>
      <div className={`mb-8 ${isGrid ? 'flex justify-center' : 'hidden'}`}>
        <img src={`http://localhost:3000/upload/${profilePic}`} alt="Profile" className="w-32 h-32 rounded-md" />
      </div>
      {isGrid ? (
        <div className="grid grid-cols-1 truncate sm:grid-cols-2 gap-2 justify-items-start mb-8">
          {titles.map((title, index) => (
            <div className="flex flex-col items-start" key={index}>
              <span className='font-bold text-gray-800'>{title}</span>
              <span className="font-medium text-gray-700">
          {index === 2 ? formattedBirthday : 
           index === 3 ? occupation : index === 4 ? phoneNumber : [name, gender][index]}
        </span>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 justify-items-start mb-6">
        { [name, gender, birthday, occupation, phoneNumber].map((value, index) => (
          <span key={index} className="font-medium text-gray-700">
            {value === birthday ? formattedBirthday : value}
          </span>
        )) }
      </div>

      )}
      <div className={`flex flex-row justify-between mt-2 absolute bottom-2 left-2 right-2`}>
        <FaEdit onClick={() => handleEdit(_id)} className="text-blue-400 w-6 h-6 hover:text-blue-800 transition-colors cursor-pointer" />
        <FaTrash onClick={() => handleDelete(_id)} className="text-blue-400 w-6 h-6 hover:text-blue-800 transition-colors cursor-pointer" />
      </div>
    </div>
  )
}

export default UserBox
export { UserBoxTitle }