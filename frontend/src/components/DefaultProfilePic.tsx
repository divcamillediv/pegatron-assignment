import defaultPfp from "../assets/default_pfp.jpeg";

export const DefaultProfilePic = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={defaultPfp} alt="Profile" className="w-sm h-sm rounded-md" />
    </div>
  );
};

/*
const ProfilePic = ({ profilePic }: { profilePic: string }) => {
  const [profilePic, setProfilePic] = useState(profilePic);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={user.profilePic} alt="Profile" className="w-sm h-sm rounded-md" />
    </div>
  );
};
*/