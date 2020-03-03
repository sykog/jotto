import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, storeFactory} from "../../test/utils/testUtils";
import Input, {Input as UnconnectedInput} from "./Input";

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store}/>).dive().dive();

  return wrapper;
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: false};
      wrapper = setup(initialState);
    });

    it('renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    it('renders the input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    it('renders the submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {success: true};
      wrapper = setup(initialState);
    });

    it('renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    it('does not render the input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    it('does not render the submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  it('has success state as a prop', () => {
    const success = true;
    const wrapper = setup({success});
    const successProp = wrapper.instance().props.success;

    expect(successProp).toBe(success);
  });
  it('guessWord action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;

    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('submit button', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    guessWordMock = jest.fn();
    wrapper = shallow(<UnconnectedInput guessWord={guessWordMock}/>);
    wrapper.setState({currentGuess: guessedWord});

    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', {preventDefault() {}});
  })

  it('calls guessWord action when submit button is clicked', () => {

    expect(guessWordMock.mock.calls.length).toBe(1);
  });

  it('submits the same value for guess word than what the input holds', () => {
    const guessedWordArg = guessWordMock.mock.calls[0][0];

    expect(guessedWordArg).toBe(guessedWord);
  });

  it('input box clears on submit', () => {
    expect(wrapper.state('currentGuess')).toBe('');
  });
});