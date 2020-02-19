import React from 'react';
import {shallow} from 'enzyme';
import Congrats from "./Congrats";
import {checkProps, findByTestAttr} from "../../test/utils/testUtils";

const defaultProps = {success: false};
const setup = (props = {}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<Congrats {...setupProps} />)
};

it('renders without error', () => {
  const wrapper = setup({success: false});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
it('renders no text when success prop is false', () => {
  const wrapper = setup({success: false});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
it('renders non-empty congrats message when success prop is true', () => {
  const wrapper = setup({success: true});
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).toBeGreaterThan(0);
});
it('does not throw a warning with expected props', () => {
  const expectedProps = {success: false};
  checkProps(Congrats, expectedProps);
});