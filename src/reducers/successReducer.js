import {actionTypes} from "../actions";

export default (state = {
  success: false,
  givenUp: false
}, action) => {
  switch (action.type) {
    case (actionTypes.CORRECT_GUESS):
      return {...state, success: true};
    case (actionTypes.RESET_GAME):
      return {...state, success: false, givenUp: false}
    case (actionTypes.GIVE_UP):
      return {...state, givenUp: true}
    default:
      return state;
  }
}