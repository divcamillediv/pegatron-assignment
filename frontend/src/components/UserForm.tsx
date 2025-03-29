import { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the cross icon
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import defaultPfp from "../assets/default_pfp.jpeg";
import { UserContext, UserState2 } from "../contexts/UserContextProvider"; // Import UserContext
import { Occupation, Gender } from "../types/types";
import { UserListContext } from "../contexts/UserListContextProvider";

export const CloseButton = () => {
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  return (
    <div onClick={toggleFormVisibility} id="close-button" className="flex justify-end text-white">
      <FaTimes className="w-6 h-6" />
    </div>
  );
};

// ProfilePic displays a user's profile picture when the display is grid.
const ProfilePic = () => {
  return (
    <img src={defaultPfp} alt="Profile" className="w-sm h-sm rounded-md" />
  )
}

const UserForm = () => {
  const { setUser } = useContext(UserContext); // Get setUser from context
  const { setUserList } = useContext(UserListContext);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("Other");
  const [birthday, setBirthday] = useState(new Date().getTime());
  const [occupation, setOccupation] = useState<Occupation>("Unemployed");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name,
      gender,
      birthday,
      occupation,
      phoneNumber,
      profilePic: profilePic
    };

    setUser(newUser); // Update user state with the new user data
    setUserList((prevUsers: UserState2[]) => [...prevUsers, newUser]);

    // Reset form fields
    setName("");
    setGender("Other");
    setBirthday(new Date().getTime());
    setOccupation("Unemployed");
    setPhoneNumber(0);
    setProfilePic(null);
  };

  const { isFormVisible } = useContext(FormVisibilityContext);

  return isFormVisible && 
     (
    <div id="big-box" className="bg-amber-500 flex-col flex p-2 rounded-lg">
      <CloseButton />
        <form id="form-box" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div id="pfp-box" className="justify-evenly mb-4 flex flex-row gap-2 items-center">
            <div id="profile-picture" className="w-32 h-32">
              {profilePic ? (
                <div className="flex w-32 h-32 overflow-hidden items-center justify-center rounded-md">
                  <img
                    alt="not found"
                    width={"250px"}
                    height={"250px"}
                    src={URL.createObjectURL(profilePic)}
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img src={defaultPfp} alt="Profile" className="w-sm h-sm rounded-md" />
                </div>
              )}
            </div>
            <label className="bg-slate-100 mt-4 p-2 rounded-md w-1/4 flex flex-col items-center justify-center">
              <span>Upload</span>
              <input
                type="file"
                name="profilePic"
                onChange={(event) => {
                  const files = event.target.files;
                  if (files && files.length > 0) {
                    setProfilePic(files[0]);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          <div id="not-pfp">
            {/* Form Inputs */}
            <label className="text-slate-100 font-bold" htmlFor="name">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
            />

            <label className="text-slate-100 font-bold" htmlFor="gender">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              id="gender"
              className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="text-slate-100 font-bold" htmlFor="birthday">Birthday:</label>
            <input
              type="date"
              value={new Date(birthday).toISOString().split("T")[0]} // Format date for input
              onChange={(e) => setBirthday(new Date(e.target.value).getTime())}
              className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
            />

            <label className="text-slate-100 font-bold" htmlFor="occupation">Occupation:</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value as Occupation)}
              id="occupation"
              className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="engineer">Engineer</option>
              <option value="unemployed">Unemployed</option>
            </select>

            <label className="text-slate-100 font-bold" htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
              placeholder="Phone Number"
              className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
            />

            <button type="submit" className="bg-red-500 mt-4 text-slate-900 rounded-md w-full p-2">
              Add User
            </button>
          </div>
        </form>
      
    </div>
  );
};

export default UserForm;