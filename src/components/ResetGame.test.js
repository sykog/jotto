import React from 'react';
import {shallow} from "enzyme";
import {findByTestAttr, storeFactory} from "../../test/utils/testUtils";
import ResetGame, {ResetGame as ResetGameComponent} from "./ResetGame";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<ResetGame store={store} />).dive();

  return wrapper;
}

describe('renders', () => {
  let wrapper;
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
  })
});

describe('reset button', () => {
  let resetGameMock;
  let wrapper;

  beforeEach(() => {
    resetGameMock = jest.fn();
    wrapper = shallow(<ResetGameComponent resetGame={resetGameMock} />);

    const resetButton = findByTestAttr(wrapper, 'reset-game-button');
    resetButton.simulate('click', {preventDefault() {}});
  });

  it('calls resetForm action when the button is clicked', () => {
    expect(resetGameMock.mock.calls.length).toBe(1);
  });
});
