import React from "react";
import NavBar from "../NavBar";
import { SideBar } from "../SideBar";

export interface JournalLayoutProps {
  children: React.ReactNode;
}

const JournalLayout: React.FC<JournalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex mt-14 min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 pt-1 bg-white">
           <SideBar/>
        </div>
        {/* Main Content */}
        <div className="w-3/4 bg-[#262254]">{children}</div>
      </div>
    </div>
  );
};

export default JournalLayout;
