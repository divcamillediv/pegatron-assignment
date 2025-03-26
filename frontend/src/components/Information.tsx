import { useContext } from "react";
import { DisplayContext } from "../contexts/DisplayContextProvider";
import { DisplayMode } from "../types/types";

export interface InfoData {
    title: string;
    content: string;
}

export const infoData: InfoData[] = [
    { title: "Name", content: "John Doe" },
    { title: "Gender", content: "Male" },
    { title: "Birthday", content: "1990-01-01" },
    { title: "Occupation", content: "Engineer" },
    { title: "Phone Number", content: "1234567890" },
];

interface InfoItemProps {
    title: string;
    content: string;
    display: DisplayMode;
}

const InfoItem = ({ title, content, display }: InfoItemProps) => {
    return (
      <div>
        {display === "grid" ? (
          <div>
              {title}: <span className="font-bold">{content}</span>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
              {content}
          </div>
        )}
      </div>
    )
}

const Information = () => {
    const { display } = useContext(DisplayContext);

    return (
        <div className={`${display === "list" ? "grid grid-cols-5 gap-4 justify-between" : "flex flex-col gap-2"}`}>       
          {infoData.map((item, index) => (
              <InfoItem 
                  key={index}
                  title={item.title}
                  content={item.content}
                  display={display}
              />
          ))}
        </div>
    )
}

export default Information