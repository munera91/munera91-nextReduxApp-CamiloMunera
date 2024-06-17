import { AppThunk } from "../store";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setImagesToActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { RootState } from "../store";
import { loadNotes } from "@/helpers/loadNotes";
import { Note } from "@/interfaces/interfaces";

export const startNewNote =
  (): AppThunk => async (dispatch, getState: () => RootState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDocRef = doc(collection(FirebaseDB, `${uid}/journal/notes/`));
    await setDoc(newDocRef, newNote);

    const newNoteWithId = {
      ...newNote,
      id: newDocRef.id,
    };

    console.log("newNote", newNote);

    dispatch(addNewEmptyNote(newNoteWithId));
    dispatch(setActiveNote(newNoteWithId));
  };

export const startLoadingNotes =
  (): AppThunk => async (dispatch, getState: () => RootState) => {
    const { uid } = getState().auth;
    console.log(uid);
    if (uid !== null) {
      const notes = await loadNotes(uid!);
      dispatch(setNotes(notes));
    }
  };

export const startSaveNote =
  (): AppThunk => async (dispatch, getState: () => RootState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!note) {
      console.error("No active note to save");
      return;
    }

    const noteToFireStore: any = { ...note };
    delete noteToFireStore.id;
    console.log(noteToFireStore);

    try {
      console.log("note.id",note.id);      
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
      await setDoc(docRef, noteToFireStore, { merge: true });
      dispatch(updateNote(note));
    } catch (error) {
      console.error("Error saving note: ", error);
    }
  };

export const startUploadingFiles =
  (files: File[]): AppThunk =>
  async (dispatch) => {
    dispatch(setSaving());

    // const fileUploadPromises = files.map(fileUpload);

    try {
      //   const photoUrls = await Promise.all(fileUploadPromises);
      //   dispatch(setImagesToActiveNote(photoUrls));
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

export const startDeletingNote =
  (): AppThunk => async (dispatch, getState: () => RootState) => {
    const { active: note } = getState().journal;
    const { uid } = getState().auth;

    if (!note) return;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
