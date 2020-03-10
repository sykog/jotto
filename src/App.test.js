import React from 'react';
import {shallow} from 'enzyme';
import {storeFactory} from "../test/utils/testUtils";
import App, {UnconnectedApp} from './App';

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store}/>).dive().dive();

  return wrapper
};

describe('redux props', () => {
  it('has a gameStatus state object as a prop', () => {
    const gameStatus = {success: false, givenUp: false};
    const wrapper = setup({gameStatus});
    const gameStatusProp = wrapper.instance().props.gameStatus;

    expect(gameStatusProp).toEqual(gameStatus);
  });
  it('has a secretWord state object as a prop', () => {
    const secretWord = 'party';
    const wrapper = setup({secretWord});
    const secretWordProp = wrapper.instance().props.secretWord;

    expect(secretWordProp).toBe(secretWord);
  });
  it('has a guessedWords state object as a prop', () => {
    const guessedWords = [{guessedWord: 'train', letterMatchCount: 3}];
    const wrapper = setup({guessedWords});
    const guessedWordsProp = wrapper.instance().props.guessedWords;

    expect(guessedWordsProp).toEqual(guessedWords);
  });
  it('has a function prop getSecretWord', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;

    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

it('getSecretWord runs on App mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    gameStatus: {success: false, givenUp: false},
    guessedWords: []
  }

  const wrapper = shallow(<UnconnectedApp {...props}/>);

  // run lifecylce method
  wrapper.instance().componentDidMount();
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
})