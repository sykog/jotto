import React from 'react';
import {shallow} from "enzyme";
import {findByTestAttr, storeFactory} from "../../test/utils/testUtils";
import ResetGame, {ResetGame as ResetGameComponent} from "./ResetGame";

const setup = (initialState = {resetting: false}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<ResetGame store={store} />).dive();

  return wrapper;
}

describe('renders', () => {
  let wrapper;

  describe('before reset button is pressed', () => {
    beforeEach(() => {
      wrapper = setup();
    });

    it('renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-reset-game');
      expect(component.length).toBe(1);
    });
    it('renders the reset button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-game-button');
      expect(resetButton.length).toBe(1);
    });
    it('does not render the reset server button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-server');
      expect(resetButton.length).toBe(0);
    });
    it('does not render the reset user button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-user');
      expect(resetButton.length).toBe(0);
    });
    it('does not render the reset user input', () => {
      const resetButton = findByTestAttr(wrapper, 'secret-word-input');
      expect(resetButton.length).toBe(0);
    });
  });

  describe('when reset button is pressed', () => {
    beforeEach(() => {
      wrapper = setup({resetting: true});
    });

    it('renders the component without error', () => {
      const component = findByTestAttr(wrapper, 'component-reset-game');
      expect(component.length).toBe(1);
    });
    it('does not render the reset button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-game-button');
      expect(resetButton.length).toBe(0);
    });
    it('renders the reset server button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-server');
      expect(resetButton.length).toBe(1);
    });
    it('renders the reset user button', () => {
      const resetButton = findByTestAttr(wrapper, 'reset-user');
      expect(resetButton.length).toBe(1);
    });
    it('renders the reset user input', () => {
      const resetButton = findByTestAttr(wrapper, 'secret-word-input');
      expect(resetButton.length).toBe(1);
    });
  });
});

describe('reset buttons', () => {
  let resetGameMock;
  let wrapper;
  const testButtonPress = (secretWord, testId) => {
    resetGameMock = jest.fn();
    wrapper = shallow(<ResetGameComponent resetGame={resetGameMock}/>);
    wrapper.setState({secretWord})

    const resetButton = findByTestAttr(wrapper, testId);
    resetButton.simulate('click', {
      preventDefault() {
      }
    });
    expect(resetGameMock.mock.calls.length).toBe(1);
  }

  it('calls reset game from server action when the button is clicked', () => {
    testButtonPress('','reset-server');
    expect(resetGameMock.mock.calls.length).toBe(1);
  });

  describe('user input rested game', () => {

    describe('invalid input', () => {
      it('does not call reset on empty string', () => {
        testButtonPress('', 'reset-user');
        expect(resetGameMock.mock.calls.length).toBe(0);
      });

      it('does not call reset on word less than 5 letters', () => {
        testButtonPress('taco', 'reset-user');
        expect(resetGameMock.mock.calls.length).toBe(0);
      });

      it('does not call reset on word more than 5 letters', () => {
        testButtonPress('hamburger', 'reset-user');
        expect(resetGameMock.mock.calls.length).toBe(0);
      });

      it('does not call reset on word with non alpha characters', () => {
        testButtonPress('1one!', 'reset-user');
        expect(resetGameMock.mock.calls.length).toBe(0);
      });

      it('does not reset the input', () => {
        const secretWord = 'train'
        testButtonPress(secretWord, 'reset-user');
        expect(wrapper.state('secretWord')).toEqual(secretWord);
      });
    });

    describe('valid input', () => {
      it('calls reset game from user action when the button is clicked', () => {
        testButtonPress('train', 'reset-user');
        expect(resetGameMock.mock.calls.length).toBe(1);
      });

      it('resets the input', () => {
        testButtonPress('train', 'reset-user');
        expect(wrapper.state('secretWord')).toEqual('');
      });
    });
  });
});
