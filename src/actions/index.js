import axios from 'axios'
import {getLetterMatchCount} from "../helpers";

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP'
};

export const guessWord = guessedWord => {
  return (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {guessedWord, letterMatchCount}
    });

    if (guessedWord === secretWord) {
      dispatch({type: actionTypes.CORRECT_GUESS})
    }
  };
};

export const getSecretWord = () => {

  return dispatch => {
    return axios.get('http://localhost:3030').then(response => {
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: response.data
      });
    });
  };
};

export const resetGame = () => {
  return dispatch => {
    dispatch(getSecretWord());
    dispatch({
      type: actionTypes.RESET_GAME
    });
  }
};

export const giveUp = () => dispatch => {
  dispatch({
    type: actionTypes.GIVE_UP,
    payload: true
  })
}