import ImageGallery from "@/components/ImageGallery";
import { useAppDispatch } from "@/hooks/hooks";
import { useForm } from "@/hooks/useForm";
import { Note } from "@/interfaces/interfaces";
import { setActiveNote } from "@/store/journal/journalSlice";
import { startDeletingNote, startSaveNote } from "@/store/journal/thunks";
import { RootState } from "@/store/store";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const NoteView = () => {
  const dispatch = useAppDispatch();

  const {
    active: note,
    savedMessage,
    isSaving,
  } = useSelector((state: RootState) => state.journal);

  const { title, body, date, onInputChange, formState } = useForm<Note>(note!);

  const dateString = useMemo(() => {
    console.log("Cambie!", date);
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onDelete = () => {
    dispatch((startDeletingNote()));
    Swal.fire("Nota eliminada correctamente",note!.title, "success");
  }

  return (
    <div className="flex flex-col min-h-screen gap-4 p-6 mb-1 bg-white animate__animated animate__fadeIn animate__faster">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-light">{dateString}</h1>
        <div className="flex items-center gap-2">
          <input type="file" name="" id="" className="hidden" multiple />
          <button className="text-blue-500 border p-2 ml-2">Subir</button>
          <button
            className="text-blue-500 p-2 border ml-2"
            onClick={onSaveNote}
          >
            Guardar
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ingrese un título"
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="¿Qué sucedió en el día de hoy?"
          name="body"
          rows={5}
          value={body}
          onChange={onInputChange}
        />
      </div>
      <div className="flex justify-end mt-2">
        <button className="text-red-500" onClick={onDelete}>Eliminar nota</button>
      </div>
      {/* {note.imageUrls && <ImageGallery images={note.imageUrls} />} */}
      <ImageGallery />
    </div>
  );
};

export default NoteView;
