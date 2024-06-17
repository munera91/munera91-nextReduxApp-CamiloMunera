import { useAppDispatch } from "@/hooks/hooks";
import { startLogout } from "@/store/auth/thunks";
import { clearNotesLogout } from "@/store/journal/journalSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Obtener la ruta actual
  const currentPath = router.pathname;

  const onLogout = () => {
    dispatch(clearNotesLogout());
    dispatch(startLogout());
  };

  return (
    <nav className="bg-gray-800 row p-4 flex justify-between items-center absolute top-0 w-full">
      <div className="text-white text-xl font-bold">JournalApp</div>
      <div className="flex items-center space-x-4">
        <Link
          href="/home"
          className={`text-white hover:text-gray-300 ${
            currentPath === "/home" ? "text-blue-500" : ""
          }`}
        >
          HomePage
        </Link>
        <Link
          href="/favorites"
          className={`text-white hover:text-gray-300 ${
            currentPath === "/favorites" ? "text-blue-500" : ""
          }`}
        >
          Favorites
        </Link>
        <div className="text-white pl-8">
          <button className="ml-2 text-red-500" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
