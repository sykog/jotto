import {actionTypes} from "../actions";
import successReducer from './successReducer';

it('returns a default initial state of false when no action is passed', () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});
it('returns a state of true upon receiving and action of type CORRECT_GUESS', () => {
  const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS});
  expect(newState).toBe(true);
});