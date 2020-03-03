import React from "react";
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from "../../test/utils/testUtils";
import GuessedWords from "./GuessedWords";
import counterControl from "../../../redux-guide/src/components/CounterControl/CounterControl";

const defaultProps = {
  guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]
};

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<GuessedWords {...setupProps} />);
};

it('does not throw a warning with expected props', () => {
  checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({guessedWords: []});
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).toBeGreaterThan(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    {guessedWord: 'train', letterMatchCount: 3},
    {guessedWord: 'agile', letterMatchCount: 1},
    {guessedWord: 'party', letterMatchCount: 5},
  ];
  beforeEach(() => {
    wrapper = setup({guessedWords});
  })

  it('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });

  it('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });

  it('each guessed word row should have 3 columns should have 3 rows', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
    const columnCount = guessedWordsNode.first().find('td').length;

    expect(columnCount).toBe(3);
  });

  it('renders "guess counter" section', () => {
    const guessCounterNode = findByTestAttr(wrapper, 'guess-counter');
    expect(guessCounterNode.length).toBe(1);
  });

  it('shows the correct number of guessed words', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNode.length).toBe(guessedWords.length);
  });

  it('shows the correct value in the guessed words counter', () => {
    const guessCounterNode = findByTestAttr(wrapper, 'guess-counter');
    const guessCounterNumber = parseInt(guessCounterNode.text().replace(/\D/g, ''));

    expect(guessCounterNumber).toBe(guessedWords.length);
  });
});