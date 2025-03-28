import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the cross icon
import { useContext } from "react";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import defaultPfp from "../assets/default_pfp.jpeg"
import { UserContext } from "../contexts/UserContextProvider"; // Import UserContext
import { Occupation, Gender } from "../types/types";

/*
{users.map((user, index) => (
        <UserBox
          key={index}
          name={user.name}
          gender={user.gender}
          birthday={user.birthday}
          occupation={user.occupation}
          phoneNumber={user.phoneNumber}
        />
      ))}
*/

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
  //form fields
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("Other");
  const [birthday, setBirthday] = useState(new Date().getTime());
  const [occupation, setOccupation] = useState<Occupation>("Unemployed");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name,
      gender,
      birthday: new Date(birthday).getTime(),
      occupation,
      phoneNumber,
      profilePic: profilePicture,
    };

    setUser(newUser); // Update user state with the new user data

    // Reset form fields
    setName("");
    setGender("Other");
    setBirthday(new Date().getTime());
    setOccupation("Unemployed");
    setPhoneNumber(0);
    setProfilePicture(null);
  };

  const inputClass = "bg-slate-100 text-slate-900 p-2 rounded-md w-full";
  const labelClass = "text-slate-100 font-bold";
  const { isFormVisible } = useContext(FormVisibilityContext);
  const imageUploaded = profilePicture !== null;

  return isFormVisible ? (
    <div id="big-box" className="bg-amber-500 flex-col flex p-2 rounded-lg">
      <CloseButton />
      <form id="form-box" onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div id="pfp-box" className="justify-evenly mb-4 flex flex-row gap-2 items-center">
          <div id="profile-picture" className="w-32 h-32">
            {imageUploaded ? (
              <div className="flex w-32 h-32 overflow-hidden items-center justify-center rounded-md">
                <img
                  alt="not found"
                  width={"250px"}
                  height={"250px"}
                  src={URL.createObjectURL(profilePicture)}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ProfilePic />
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
                if (files !== null && files && files.length > 0) {
                  setProfilePicture(files[0]);
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        <div id="not-pfp">
          {/* Form Inputs */}
          <label className={labelClass} htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={inputClass}
          />

          <label className={labelClass} htmlFor="gender">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            id="gender"
            className={inputClass}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className={labelClass} htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(new Date(e.target.value).getTime())}
            className={inputClass}
          />

          <label className={labelClass} htmlFor="occupation">Occupation:</label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value as Occupation)}
            id="occupation"
            className={inputClass}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="engineer">Engineer</option>
            <option value="unemployed">Unemployed</option>
          </select>

          <label className={labelClass} htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            placeholder="Phone Number"
            className={inputClass}
          />

          <button type="submit" className="bg-red-500 mt-4 text-slate-900 rounded-md w-full p-2">
            Add User
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default UserForm;