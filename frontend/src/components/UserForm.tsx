import { useState, useContext, useEffect, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import { UserContext } from "../contexts/UserContextProvider"; 
import { Occupation, Gender } from "../types/types";
import { UserListContext } from "../contexts/UserListContextProvider";
import { DefaultProfilePic } from "./DefaultProfilePic";

export const CloseButton = () => {
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  return (
    <div onClick={toggleFormVisibility} id="close-button" className="flex justify-end text-white">
      <FaTimes className="w-6 h-6" />
    </div>
  );
};

// ProfilePic displays a user's profile picture when the display is grid.
export const ProfilePic = () => {  
  const { isBeingEdited } = useContext(UserContext);
  const isEditing = Boolean(isBeingEdited);
  const [profilePic, setProfilePic] = useState<File | null>(isEditing ? isBeingEdited?.profilePic ?? null : null);
  console.log("profilePic of ProfilePic", profilePic);
  
  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProfilePic(files[0]);
      console.log("profilePic of ProfilePic just after upload", profilePic);
    }
  }

  return (
    <>
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
            <DefaultProfilePic />
          )}
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
}

const UserForm = () => {  
  const { setUser, isBeingEdited, setIsBeingEdited } = useContext(UserContext);
  const { setUserList } = useContext(UserListContext);
  const { isFormVisible, toggleFormVisibility } = useContext(FormVisibilityContext);
  let isEditing = Boolean(isBeingEdited);

  const [id, setId] = useState(isEditing ? isBeingEdited?.id ?? new Date().getTime() : new Date().getTime());
  const [name, setName] = useState(isEditing ? isBeingEdited?.name ?? "" : "");
  const [gender, setGender] = useState(isEditing ? isBeingEdited?.gender ?? "Male" : "Male");
  const [birthday, setBirthday] = useState(
    isEditing
      ? isBeingEdited?.birthday ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  );
  const [occupation, setOccupation] = useState(isEditing ? isBeingEdited?.occupation ?? "Student" : "Student");
  const [phoneNumber, setPhoneNumber] = useState(isEditing ? isBeingEdited?.phoneNumber ?? "" : "");
  const [profilePic, setProfilePic] = useState<File | null>(isEditing ? isBeingEdited?.profilePic ?? null : null);
  console.log("profilePic of UserForm at start", profilePic);

  useEffect(() => {
    if (isBeingEdited) {
      setId(isBeingEdited.id);
      setName(isBeingEdited.name);
      setGender(isBeingEdited.gender);
      setBirthday(isBeingEdited.birthday);
      setOccupation(isBeingEdited.occupation);
      setPhoneNumber(isBeingEdited.phoneNumber);
      setProfilePic(isBeingEdited.profilePic);
    }
  }, [isBeingEdited]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    function resetFormFields() {
      setId(new Date().getTime());
      setName("");
      setGender("Male");
      setBirthday(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
      setOccupation("Student");
      setPhoneNumber("");
      setProfilePic(null);
    }

    async function createUser() {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, gender, birthday, occupation, phoneNumber, profilePic }),
        });
    
        if (response.ok) {
          const newUser = await response.json();
          setUser(newUser);
          setUserList((prevUsers) => [...prevUsers, newUser]); // Update frontend state
          resetFormFields();
        } else {
          console.error("Failed to create user");
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }

    async function updateUser() {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, gender, birthday, occupation, phoneNumber, profilePic }),
        });
    
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          setUserList((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id ? updatedUser : user
            )
          );
          // Clear the editing state
          setIsBeingEdited(null);
          isEditing = false;
        } else {
          console.error("Failed to update user");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (isEditing) {
      await updateUser();
    } else {
      await createUser();
    }

    if (!isEditing) resetFormFields();

    toggleFormVisibility();
  };


  return isFormVisible && 
     (
    <div id="big-box" className="bg-amber-500 flex-col flex p-2 rounded-lg">
      <CloseButton />
        <form id="form-box" onSubmit={handleSubmit}>
          <ProfilePic />
          <div id="not-pfp">            {[
              { label: "Name", type: "text", value: name, onChange: (e: { target: { value: SetStateAction<string>; }; }) => 
                setName(e.target.value), placeholder: "Name", id: "name" },
              { label: "Gender", type: "select", value: gender, onChange: (e: { target: { value: string; }; }) => 
                setGender(e.target.value as Gender), options: ["Male", "Female", "Other"], id: "gender" },
              { label: "Birthday", type: "date", value: new Date(birthday).toISOString().split("T")[0], onChange: (e: { target: { value: string | number | Date; }; }) => 
                setBirthday(new Date(e.target.value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })), id: "birthday" },
              { label: "Occupation", type: "select", value: occupation, onChange: (e: { target: { value: string; }; }) => 
                setOccupation(e.target.value as Occupation), options: ["Student", "Teacher", "Engineer", "Unemployed"], id: "occupation" },
              { label: "Phone Number", type: "tel", value: phoneNumber, pattern: "[\d\s+\-().]{7,}", onChange: (e: { target: { value: string; }; }) => 
                setPhoneNumber(e.target.value), placeholder: "Phone Number", id: "phoneNumber" }
            ].map(({ label, type, value, onChange, placeholder, options, id }) => (
              <div key={id}>
                <label className="text-slate-100 font-bold" htmlFor={id}>{label}:</label>
                {type === "select" ? (
                  <select value={value} onChange={onChange} id={id} className="bg-slate-100 text-slate-900 p-2 rounded-md w-full">
                    {options?.map(option => <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)}
                  </select>
                ) : (
                  <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="bg-slate-100 text-slate-900 p-2 rounded-md w-full"
                  />
                )}
              </div>
            ))}

            <button type="submit" className="bg-red-500 mt-4 text-slate-900 rounded-md w-full p-2">
              {isEditing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      
    </div>
  );
};

export default UserForm;