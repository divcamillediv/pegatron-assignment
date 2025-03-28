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
    insertUser({ userList: { autoIncrement: 0, users: [] }, setUserList: () => {} });

    // Reset form fields
    setName("");
    setGender("other");
    setBirthday("");
    setOccupation("unemployed");
    setPhoneNumber("");
    setProfilePicture(null);
  };

  const inputClass = "bg-slate-100 text-amber-500 p-2 rounded-md w-full";
  const labelClass = "text-slate-100 font-bold";
  const { isFormVisible } = useContext(FormVisibilityContext);
  const imageUploaded = profilePicture !== null;

  return (
    isFormVisible ? (
      <div id="big-box" className="bg-amber-500 flex-col flex p-2 rounded-lg">
        <CloseButton />       
        <form id="form-box" onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div id="pfp-box" className="bg-blue-600 mb-4 flex">
            <div id="profile-picture" className="bg-purple-700 w-16 h-16">
                {imageUploaded ? (
                  <img
                    alt="not found"
                    width={"250px"}
                    height={"250px"}
                    src={URL.createObjectURL(profilePicture)}
                  />
                ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ProfilePic />
                </div>
              )}
              <label className=" mt-4 p-2 rounded-md w-full flex items-center justify-center">
                <input
                      type="file"
                      name="profilePic"
                      onChange={(event) => {
                        const files = event.target.files;
                        if (files !== null && files && files.length > 0) {
                          setProfilePicture(files[0]);
                        }
                      }} 
                      className="flex" // Hide the input but keep it functional
                />
                <span>Upload</span>
              </label>
            </div>
          </div>

          <div id="not-pfp" className="bg-red-600 mt-2">
            {/* Right Column: Form Inputs */}
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

              <button type="submit" className="bg-slate-100 text-amber-500 p-2 rounded-md w-full flex items-center justify-center">
                Add User
              </button>
            </div>
          </form>
        </div>
    ) : null
  );
};


export default UserForm;
