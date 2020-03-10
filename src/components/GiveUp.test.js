import React from 'react';
import {shallow} from 'enzyme';
import {checkProps, findByTestAttr, storeFactory} from "../../test/utils/testUtils";
import GiveUp, {GiveUp as GiveUpComponent} from "./GiveUp";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<GiveUp store={store}/>).dive().dive();

  return wrapper;
}

describe('rendering', () => {
  it('renders without error', () => {
    const wrapper = setup({gameStatus: {success: false}});
    const component = findByTestAttr(wrapper, 'component-give-up');
    expect(component.length).toBe(1);
  });

  it('renders give up button when success prop is false', () => {
    const wrapper = setup({gameStatus:{success: false}});
    const button = findByTestAttr(wrapper, 'give-up-button');
    expect(button.length).toBe(1);
  });

  it('does not render give up button when success prop is true', () => {
    const wrapper = setup({gameStatus:{success: true}});
    const button = findByTestAttr(wrapper, 'give-up-button');
    expect(button.length).toBe(0);
  });

  it('renders try again text when givenUp prop is true', () => {
    const wrapper = setup({gameStatus:{givenUp: true}});
    const button = findByTestAttr(wrapper, 'try-again');
    expect(button.length).toBe(1);
  });

  it('does not render try again text button when givenUp prop is false', () => {
    const wrapper = setup({gameStatus:{givenUp: false}});
    const button = findByTestAttr(wrapper, 'try-again');
    expect(button.length).toBe(0);
  });

  it('does not throw a warning with expected props', () => {
    const expectedProps = {gameStatus: {success: false, givenUp: false}};
    checkProps(GiveUp, expectedProps);
  });
});

describe('redux props', () => {
  it('has a game status state with a givenUp and success objects as props', () => {
    const gameStatus = {gameStatus:{givenUp: false, success: false}};
    const wrapper = setup(gameStatus);
    const gameStatusProp = wrapper.instance().props.gameStatus;

    expect(gameStatusProp).toEqual(gameStatus.gameStatus);
  });
  it('giveUp action creator is a function prop', () => {
    const wrapper = setup();
    const giveUpProp = wrapper.instance().props.giveUp;

    expect(giveUpProp).toBeInstanceOf(Function);
  });
});

describe('submit button', () => {
  let giveUpMock;
  let wrapper;
  const gameStatus = {givenUp: false};

  beforeEach(() => {
    giveUpMock = jest.fn();
    wrapper = shallow(<GiveUpComponent giveUp={giveUpMock} gameStatus={{givenUp:false}}/>);
    wrapper.setState(gameStatus);

    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', {
      preventDefault() {
      }
    });
  })

  it('calls giveUp action when submit button is clicked', () => {
    expect(giveUpMock.mock.calls.length).toBe(1);
  });
});
