import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/auxFixtures";

describe("Test AuthSlice", () => {
  test("Debe regresar el estado inicial y llamarse auth", () => {
    // console.log(authSlice);

    const state = authSlice.reducer(initialState, { type: "unknown" });

    expect(authSlice.name).toBe("auth");

    expect(state).toEqual(initialState);
  });

  test("Debe de realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("Debe realizar el logout sin argumentos", () => {
    const state = authSlice.reducer(initialState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test("Debe realizar el logout con argumentos", () => {
    const errorMessage: string = "Error al salir de la aplicacion";
    const state = authSlice.reducer(initialState, logout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("Debe de cambiar el estado a checking", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toEqual("checking");
  });
});
