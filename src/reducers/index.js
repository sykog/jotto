import {combineReducers} from "redux";
import gameStatus from './successReducer';
import guessedWords from './guessedWordsReducer'
import secretWord from './secretWordReducer';

export default combineReducers({
  gameStatus,
  guessedWords,
  secretWord
});