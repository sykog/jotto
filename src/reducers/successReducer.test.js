import {actionTypes} from "../actions";
import successReducer from './successReducer';


describe('initial state gameStatus object', () => {
  it('is an object', () => {
    const newState = successReducer(undefined, {});
    expect(newState).toBeInstanceOf(Object);
  });

  it('has success property of false', () => {
    const newState = successReducer(undefined, {});
    expect(newState.success).toBe(false);
  });

  it('has success property of false', () => {
    const newState = successReducer(undefined, {});
    expect(newState.givenUp).toBe(false);
  });
})

describe('testing action types', () => {
  it('returns a state object with success prop of true upon receiving and action of type CORRECT_GUESS', () => {
    const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
    expect(newState.success).toBe(true);
  });

  it('returns a state object with givenUp prop of true upon receiving and action of type GIVE_UP', () => {
    const newState = successReducer(undefined, {type: actionTypes.GIVE_UP});
    expect(newState.givenUp).toBe(true);
  });

  it('returns a state object with success props of true and givenUp props of false upon receiving and action of type CORRECT_GUESS', () => {
    const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
    expect(newState).toEqual({success: true, givenUp: false});
  });
});