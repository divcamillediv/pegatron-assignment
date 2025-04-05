import { useState, useContext, useEffect, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";
import { FormVisibilityContext } from "../contexts/FormVisibilityContextProvider";
import { UserContext } from "../contexts/UserContextProvider"; 
import { Occupation, Gender } from "../types/types";
import { UserListContext } from "../contexts/UserListContextProvider";
import { parseISO, isValid } from 'date-fns';
import { ProfilePic } from "./ProfilePic";

export const CloseButton = () => {
  const { toggleFormVisibility } = useContext(FormVisibilityContext);

  return (
    <div onClick={toggleFormVisibility} id="close-button" className="flex justify-end text-white">
      <FaTimes className="w-6 h-6" />
    </div>
  );
};

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
  console.log("profilePic of UserForm at start", profilePic);

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
          console.log("New user created:", newUser);
          console.log("New user id:", newUser._id);
        } else {
          console.error("Failed to create user");
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }

    async function createUser2() {
      try {
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("birthday", birthday);
        formData.append("occupation", occupation);
        formData.append("phoneNumber", phoneNumber);
        formData.append("profilePicture", profilePic);

        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: formData, // no need for headers, browser sets it for FormData
        });
    
        if (response.ok) {
          const newUser = await response.json();
          setUser(newUser);
          setUserList((prevUsers) => [...prevUsers, newUser]); 
          resetFormFields();
          console.log("New user created:", newUser);
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

    async function updateUser2(_id: string) {
      try {
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("birthday", birthday);
        formData.append("occupation", occupation);
        formData.append("phoneNumber", phoneNumber);
        formData.append("profilePicture", profilePic);

        const response = await fetch(`http://localhost:3000/users/${_id}`, {
          method: "PUT",
          body: formData, // no need for headers, browser sets it for FormData
        });
    
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
          setUserList((prevUsers) =>
            prevUsers.map((user) =>
              user._id === _id ? updatedUser : user
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
      await updateUser(_id);
    } else {
      await createUser();
    }

    if (!isEditing) resetFormFields();

    toggleFormVisibility();
  };

  // date mask
  const handleDateChange = (e: { target: { value: string; }; }) => {
    const parsed = parseISO(e.target.value); 
    if (!isValid(parsed)) {
      console.error('Invalid date format');
    } else{
    let inputValue = e.target.value.replace(/\D/g, ""); // Strip non-numeric characters
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
    <div id="big-box" className="bg-amber-500 flex-col flex p-2 rounded-lg">
      <CloseButton />
        <form id="form-box" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
          <ProfilePic />
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