import { JournalState, Note } from "@/interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: JournalState = {
  isSaving: false,
  savedMessage: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note | null>) => {
      state.active = action.payload;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      state.savedMessage = `${action.payload.title}, actualizada correctamente`;
    },
    setImagesToActiveNote: (state, action: PayloadAction<string[]>) => {
      // if (state.active) {
      //   state.active.imageUrls = [
      //     ...state.active.imageUrls,
      //     ...action.payload,
      //   ];
      // }
      // state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action: PayloadAction<string>) => {
      state.isSaving = false;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setImagesToActiveNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;

export default journalSlice.reducer;
