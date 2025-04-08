import { useState, useContext, useEffect, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import { UserContext } from "../contexts/UserContextProvider"; 
import { Occupation, Gender } from "../types/types";
import { UserListContext } from "../contexts/UserListContextProvider";
import { parseISO, isValid } from 'date-fns';

export const CloseButton = () => {
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  return (
    <div onClick={toggleFormVisibility} id="close-button" className="flex justify-end text-white">
      <FaTimes className="w-6 h-6" />
    </div>
  );
};

/**
 * UserForm is the component to enter a user's information.
 * It appears when the user clicks on the "Add User" button
 * (AddUserButton component) in the ToolBar component.
 * @returns A UserForm component.
 */

const UserForm = () => {  
  const { setUser, isBeingEdited, setIsBeingEdited } = useContext(UserContext);
  const { setUserList } = useContext(UserListContext);
  const { isFormVisible, toggleFormVisibility } = useContext(FormVisibilityContext);
  let isEditing = Boolean(isBeingEdited);
  const [_id, setId] = useState(isEditing ? isBeingEdited?._id ?? "" : "");
  const [name, setName] = useState(isEditing ? isBeingEdited?.name ?? "" : "");
  const [gender, setGender] = useState(isEditing ? isBeingEdited?.gender ?? "Male" : "Male");
  const [birthday, setBirthday] = useState(
    isEditing
      ? isBeingEdited?.birthday ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  );
  const [occupation, setOccupation] = useState(isEditing ? isBeingEdited?.occupation ?? "Student" : "Student");
  const [phoneNumber, setPhoneNumber] = useState(isEditing ? isBeingEdited?.phoneNumber ?? "" : "");
  const [profilePic, setProfilePic] = useState(isEditing ? isBeingEdited?.profilePic ?? "0default.jpg" : "0default.jpg");

  useEffect(() => {
    if (isBeingEdited) {
      setId(isBeingEdited._id);
      setName(isBeingEdited.name);
      setGender(isBeingEdited.gender);
      setBirthday(isBeingEdited.birthday);
      setOccupation(isBeingEdited.occupation);
      setPhoneNumber(isBeingEdited.phoneNumber);
      setProfilePic(isBeingEdited.profilePic);
    }
  }, [isBeingEdited]);

  // upload profile picture
  const uploadPFP = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
              const pfp = data.path;
              setProfilePic(pfp); 
          } else {
              console.error("Failed to upload image");
          }
      } catch (error) {
          console.error("Error uploading image:", error);
      }
    }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    function resetFormFields() {
      setId("");
      setName("");
      setGender("Male");
      setBirthday(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
      setOccupation("Student");
      setPhoneNumber("");
      setProfilePic("0default.jpg");
    }

    async function createUser() {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, name, gender, birthday, occupation, phoneNumber, profilePic }),
        });
        
        if (response.ok) {
          const newUser = await response.json();
          setUser(newUser);
          setUserList((prevUsers) => [...prevUsers, newUser]); 
          resetFormFields();
        } else {
          console.error("Failed to create user");
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }

    async function updateUser(_id: string) {
      try {
        const response = await fetch(`http://localhost:3000/users/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, name, gender, birthday, occupation, phoneNumber, profilePic }),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          setUserList((prevUsers) =>
            prevUsers.map((user) =>
              user._id === _id ? updatedUser : user
            )
          );
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
      await updateUser(_id);
    } else {
      await createUser();
    }

    if (!isEditing) resetFormFields();

    toggleFormVisibility();
  };

  // date mask to check valid date format
  const handleDateChange = (e: { target: { value: string; }; }) => {
    const parsed = parseISO(e.target.value); 
    if (!isValid(parsed)) {
      console.error('Invalid date format');
    } else{
    let inputValue = e.target.value.replace(/\D/g, ""); 
    if (inputValue.length <= 4) {
      setBirthday(inputValue);
    } else {
      inputValue = `${inputValue.slice(0, 4)}-${inputValue.slice(4, 6)}-${inputValue.slice(6, 8)}`;
      setBirthday(inputValue);
    }
  }
  };


  return isFormVisible && 
     (
    <div id="big-box" className="bg-blue-400 flex-col flex p-2 rounded-lg">
      <CloseButton />
        <form id="form-box" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <div id="pfp-box" className="justify-evenly mb-4 flex flex-row gap-2 items-center">
          <div id="profile-picture" className="w-32 h-32">
              <div className="flex w-32 h-32 overflow-hidden items-center justify-center rounded-md">
                <img
                  alt="profilePic component"
                  width={"250px"}
                  height={"250px"}
                  src={profilePic ? `http://localhost:3000/upload/${profilePic}` : `http://localhost:3000/upload/0default.jpg`}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
          </div>
            <label className="bg-slate-100 mt-4 p-2 rounded-md w-1/4 flex flex-col items-center justify-center">
              <span>Upload</span>
              <input
                type="file"
                name="profilePic"
                onChange={uploadPFP}
                className="hidden"
              />
            </label>
        </div>
          <div id="not-pfp">            {[
              { label: "Name", type: "text", value: name, onChange: (e: { target: { value: SetStateAction<string>; }; }) => 
                setName(e.target.value), placeholder: "Name", id: "name" },
              { label: "Gender", type: "select", value: gender, onChange: (e: { target: { value: string; }; }) => 
                setGender(e.target.value as Gender), options: ["Male", "Female", "Other"], id: "gender" },
              { label: "Birthday", type: "date", value: new Date(birthday).toISOString().split("T")[0], onChange: (e: { target: { value: string; }; }) => handleDateChange(e), id: "birthday" },
              { label: "Occupation", type: "select", value: occupation, onChange: (e: { target: { value: string; }; }) => 
                setOccupation(e.target.value as Occupation), options: ["Student", "Teacher", "Engineer", "Unemployed"], id: "occupation" },
              { label: "Phone Number", type: "tel", value: phoneNumber, pattern: "[\d\s+\-().]{7,}", onChange: (e: { target: { value: string; }; }) => 
                setPhoneNumber(e.target.value), placeholder: "Phone Number", id: "phoneNumber" }
            ].map(({ label, type, value, onChange, placeholder, options, id }) => (
              <div key={id}>
                <label className="text-slate-100 font-bold" htmlFor={id}>{label}:</label>
                {type === "select" ? (
                  <select value={value} onChange={onChange} id={id} className="bg-slate-100 cursor-pointer text-slate-900 p-2 rounded-md w-full">
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

            <button type="submit" className="bg-blue-200 cursor-pointer mt-4 text-slate-900 rounded-md w-full p-2">
              {isEditing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      
    </div>
  );
};

export default UserForm;