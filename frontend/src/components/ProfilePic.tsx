import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";

// ProfilePic displays a user's profile picture when the display is grid.
export const ProfilePic = () => {  
    const { isBeingEdited } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const isEditing = Boolean(isBeingEdited);
    const [profilePic, setProfilePic] = useState(isEditing ? isBeingEdited?.profilePic : "0default.jpg");
  
    const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("profilePic", file);
        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log("data of ProfilePic", data);
                console.log("path", data.path);
                console.log("data.path", data.path);
                setProfilePic(data.path); // Assuming the backend returns the path in the response
                console.log("profilePic of ProfilePic", profilePic);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
      }
    
    return (
      <>
        {/* Profile Picture Upload */}
        <div id="pfp-box" className="justify-evenly mb-4 flex flex-row gap-2 items-center">
          <div id="profile-picture" className="w-32 h-32">
              <div className="flex w-32 h-32 overflow-hidden items-center justify-center rounded-md">
                <img
                  alt="not found"
                  width={"250px"}
                  height={"250px"}
                  src={profilePic ? `http://localhost:3000/upload/${user.profilePic}` : `http://localhost:3000/upload/0default.jpg`}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
          </div>
          <label className="bg-slate-100 mt-4 p-2 rounded-md w-1/4 flex flex-col items-center justify-center">
            <span>Upload</span>
            <input
              type="file"
              name="profilePic"
              onChange={upload}
              className="hidden"
            />
          </label>
        </div>
      </>
    );
  };