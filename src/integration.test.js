import {storeFactory} from '../test/utils/testUtils';
import {guessWord, resetGame} from './actions'

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store;
    const initialState = {secretWord}
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initialState,
        gameStatus: {
          success: false,
          givenUp: false
        },
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      };

      expect(newState).toEqual(expectedState);
    });
    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        gameStatus: {
          success: true,
          givenUp: false
        },
        guessedWords: [
          {guessedWord: secretWord, letterMatchCount: 5}
        ]
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [{guessedWord: 'agile', letterMatchCount: 1}]
    const initialState = {guessedWords, secretWord};
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        gameStatus: {
          success: false,
          givenUp: false
        },
        guessedWords: [
          ...guessedWords,
          {guessedWord: unsuccessfulGuess, letterMatchCount: 3}
        ]
      }

      expect(newState).toEqual(expectedState);
    });
    it('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        gameStatus: {
          success: true,
          givenUp: false
        },
        guessedWords: [
          ...guessedWords,
          {guessedWord: secretWord, letterMatchCount: 5}
        ]
      }

      expect(newState).toEqual(expectedState);
    });

    describe('resetting the game', () => {
      let newState;
      beforeEach(() => {
        store.dispatch(resetGame());
        newState = store.getState();
      });

      it('clears the guessed words', () => {
        expect(newState.guessedWords).toEqual([]);
      });

      it('sets success prop to false', () => {
        expect(newState.gameStatus.success).toBe(false);
      });
    });
  });
});