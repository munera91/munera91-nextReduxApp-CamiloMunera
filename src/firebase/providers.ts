import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

interface SignInResult {
  ok: boolean;
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  errorMessage?: string;
}

export const signInWithGoogle = async (): Promise<SignInResult> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const user = result.user;
    const displayName = user.displayName ?? ''; 
    const email = user.email ?? ''; 
    const photoURL = user.photoURL ?? ''; 
    const uid = user.uid;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };

  } catch (error:any) {
    const errorMessage = error.code;
    return {
      ok: false,
      errorMessage,
    };
  }
}

interface RegisterUserParams {
  email: string;
  password: string;
  displayName: string;
}

export const registerUserWithEmailPassword = async({ email, password, displayName }: RegisterUserParams) => {

  try {
      const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
      const { uid, photoURL } = resp.user;

      await updateProfile( FirebaseAuth.currentUser!, { displayName });

      return {
          ok: true,
          uid, photoURL, email, displayName
      }

  } catch (error:any) {
      console.log(error);
      return { ok: false, errorMessage: error.message }
  }

}

interface LoginUserParams {
  email: string;
  password: string;
}

export const loginWithEmailPassword = async({ email, password }:LoginUserParams) => {

  try {
      const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
      const { uid, photoURL, displayName } = resp.user;

      return {
          ok: true,
          uid, photoURL, displayName
      }

  } catch (error:any) {
      return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}



