import ImageGallery from "@/components/ImageGallery";
import PrivateRoute from "@/components/PrivateRoute";
import JournalLayout from "@/components/layout/JournalLayout";
import { useAppDispatch } from "@/hooks/hooks";
import { startLoadingNotes, startNewNote } from "@/store/journal/thunks";
import { RootState } from "@/store/store";
import NoteView from "@/views/NoteView";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const JournalPage: NextPage = () => {
  const { isSaving, active } = useSelector((state: RootState) => state.journal);
  const dispatch = useAppDispatch();

  const onClickNewNote = () => {
    console.log("startNewNote");

    dispatch(startNewNote());
  };

  useEffect(() => {
    dispatch(startLoadingNotes());
  }, [])
  

  return (
    <PrivateRoute>
      <JournalLayout>
        {(!!active) ? (
          <NoteView />
        ) : (
          <div className="flex min-h-screen justify-center items-center">
            <h1 className="text-white">Selecciona o crea una entrada</h1>
          </div>
        )}

        <button
          onClick={onClickNewNote}
          disabled={isSaving}
          className={`fixed right-12 bottom-12 text-white bg-red-600 rounded-full p-4 hover:bg-red-600 hover:opacity-90`}
        >
          Add
        </button>
      </JournalLayout>
    </PrivateRoute>
  );
};

export default JournalPage;
