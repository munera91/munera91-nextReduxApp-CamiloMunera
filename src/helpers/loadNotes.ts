import { collection, getDocs, DocumentData } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Note } from "@/interfaces/interfaces";



export const loadNotes = async (uid: string = ""): Promise<Note[]> => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const querySnapshot = await getDocs(collectionRef);

  const notes: Note[] = [];
  querySnapshot.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() } as Note);
  });

  return notes;
};
