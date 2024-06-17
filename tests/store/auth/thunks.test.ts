import {
  checkingAuthentication,
  startGoogleSignIn,
} from "../../../src/store/auth/thunks";
import { checkingCredentials, login } from "../../../src/store/auth/authSlice";
import { demoUser } from "../../fixtures/auxFixtures";
import { signInWithGoogle } from "@/firebase/providers";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch, getState, null);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login exitoso", async () => {
    const loginData = { ok: true, ...demoUser };

    (signInWithGoogle as jest.Mock).mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch, getState, null);

    // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });
});
