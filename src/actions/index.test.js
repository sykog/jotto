import moxios from "moxios";
import { storeFactory } from "../../test/utils/testUtils";
import { chooseSecretWord } from "./index";

describe("gerSecretWord action creator", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("adds response word to state", () => {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord
      });
    });

    return store.dispatch(chooseSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });

  it("returns error object when unable to connect to the server", () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 503,
        response: { message: "Unable to Connect to the Server" }
      });
    });

    return store.dispatch(chooseSecretWord()).then(() => {
      const newState = store.getState();
      console.log(store);
      expect(typeof newState.secretWord).toBe("object");
    });
  });
});
