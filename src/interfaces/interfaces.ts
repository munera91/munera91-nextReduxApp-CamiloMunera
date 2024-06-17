export interface Note {
  id: string;
  title: string;
  body: string;
  imageUrls?: string[];
  date: number;
}

export interface JournalState {
  isSaving: boolean;
  savedMessage: string;
  notes: Note[];
  active: Note | null;
}

export interface LoginPayload {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}
