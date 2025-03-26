import defaultPfp from "../assets/default_pfp.jpeg"
import Information, { infoData } from "./Information"
import { useContext } from "react"
import { DisplayContext } from "../contexts/DisplayContextProvider"

/**
 * UserBox is the component that displays a user's information.
 * It is used in the Display component.
 * It can be displayed as a box or a list.
 * @returns A UserBox component.
 */

// ProfilePic displays a user's profile picture when the display is grid.
const ProfilePic = () => {
  return (
    <img src={defaultPfp} alt="Profile" className="w-sm h-sm rounded-md" />
  )
}

// UserBoxTitle displays the user's information when the display is list.
const UserBoxTitle = () => {
  return (
    <div className="bg-red-600 text-white flex-col flex gap-2 p-2 rounded-lg">
      <div className="grid grid-cols-5 gap-4">
        {infoData.map((item, index) => (
          <span key={index} className="font-bold">{item.title}</span>
        ))}
      </div>
    </div>
  )
}

// UserBox is the main component that displays the user's information.
const UserBox = () => {
  const { display } = useContext(DisplayContext);
  const isGrid = display === "grid";

  return (  
    <div className="bg-amber-500 flex-col flex p-2 rounded-lg">
      {isGrid && <ProfilePic/>}
      <Information/>
    </div>
  )
}

export default UserBox
export { ProfilePic, UserBoxTitle }