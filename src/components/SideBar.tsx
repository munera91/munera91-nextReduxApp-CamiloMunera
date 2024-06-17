import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";

export const SideBar = () => {
  const { notes } = useSelector((state: RootState) => state.journal);

  return (
    <nav className={`w-1/4`}>
      <div className="fixed left-0 w-1/4 flex flex-col bg-white border-r">
        <div className="flex-1 overflow-y-auto">
          <ul className="p-2">
            {notes.map((nt) => (
              <SideBarItem key={nt.id} note={nt} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
