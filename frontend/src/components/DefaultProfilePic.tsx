import { useContext, useState } from "react";
import defaultPfp from "../assets/default_pfp.jpeg";
import { UserListContext } from "../contexts/UserListContextProvider";

export const DefaultProfilePic = () => {

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={defaultPfp} alt="Profile" className="w-36 h-36 rounded-md" />
    </div>
  );
};

/*
const ProfilePic = () => {
  const [profilePic, setProfilePic] = useState();
  const { userList, setUserList } = useContext(UserListContext);

  const handleProfilePic = () => {
    try {
      const response = await fetch(`http://localhost:3000/upload`, {
        method: "PUT",
      });
      console.log("Response:", response);
      if (response.ok) {
        setUserList()
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }


  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={user.profilePic} alt="Profile" className="w-sm h-sm rounded-md" />
    </div>
  );
};
*/