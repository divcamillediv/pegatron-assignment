import { useState } from "react";
import { insertUser } from "../models/user"; // Assuming insertUser is exported from user.ts
import { FaTimes } from "react-icons/fa"; // Importing the cross icon
import { ProfilePic } from "./UserBox";
import { useContext } from "react";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";

export const CloseButton = () => {
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  return (
    <div onClick={toggleFormVisibility} id="close-button" className="flex justify-end text-white">
      <FaTimes className="w-6 h-6" />
    </div>
  );
};

const UserForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("other");
  const [birthday, setBirthday] = useState("");
  const [occupation, setOccupation] = useState("unemployed");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
    insertUser({ userList: { autoIncrement: 0, users: [] }, setUserList: () => {} });

    // Reset form fields
    setName("");
    setGender("other");
    setBirthday("");
    setOccupation("unemployed");
    setPhoneNumber("");
    setProfilePicture("");
  };

  const inputClass = "bg-slate-100 text-amber-500 p-2 rounded-md w-full";
  const labelClass = "text-slate-100 font-bold";
  const { isFormVisible } = useContext(FormVisibilityContext);

  return (
    isFormVisible ? (
      <div id="big-box" className="bg-amber-500 p-2 rounded-lg">
        <CloseButton />
        <div id="form-box" className="grid grid-cols-2 gap-4">
          {/* Left Column: Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div id="profile-picture" className="w-48 h-48 bg-slate-100 rounded-xl">
              <ProfilePic />
            </div>
            <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">Upload</button>
          </div>

          {/* Right Column: Form Inputs */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 items-center pr-8 pt-2 justify-items-end">
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
              onChange={(e) => setGender(e.target.value)}
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
              onChange={(e) => setBirthday(e.target.value)}
              className={inputClass}
            />

            <label className={labelClass} htmlFor="occupation">Occupation:</label>
            <select
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className={inputClass}
            />
            <div/>
            <button type="submit" className="bg-slate-100 text-amber-500 p-2 rounded-md w-full flex items-center justify-center">
              Add User
            </button>
          </form>
        </div>
      </div>
    ) : null
  );
};


export default UserForm;
