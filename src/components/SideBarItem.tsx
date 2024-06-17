import React from "react";
import { Note } from "../interfaces/interfaces";
import { useAppDispatch } from "@/hooks/hooks";
import { setActiveNote } from "@/store/journal/journalSlice";

interface SideBarItemProps {
  note: Note;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ note }) => {

   const dispath = useAppDispatch();

   const onClick = () => {
     dispath(setActiveNote(note));
   }

  return (
    <li onClick={onClick} className="cursor-pointer border hover:bg-gray-200">
      <div className="flex items-center p-2">
        {/* <div className="mr-2">Icon</div> */}
        <div className="flex flex-col">
          <span className="font-semibold">{note.title}</span>
          <span className="text-sm text-gray-600">{note.body}</span>
        </div>
      </div>
    </li>
  );
};

export default SideBarItem;
