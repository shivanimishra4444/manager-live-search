import React from 'react';
import SearchWrapper from '../search';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = shallow(<SearchWrapper />);

describe('<SearchWrapper />', () => {
  const handleChange = jest.fn();

  it('renders without crashing', () => {
    wrapper;
    expect(wrapper.find('input').exists());
  });
  it('input value should be empty when keyup is created', () => {
    // mock input input and Enter events
    const mockEvent = {
      keyCode: 13, // enter event
      target: {
        value: 'Test'
      }
    };

    wrapper.find('input').simulate('keyup', mockEvent);
    expect(mockEvent.target.value === '');
  });

  it('input value should be Tests when keydown is created', () => {
    // mock input input and Enter events
    const mockEvent = {
      keyCode: 13, // enter event
      target: {
        value: 'Test'
      }
    };
    wrapper.find('input').simulate('keydown', mockEvent);
    expect(mockEvent.target.value === 'Test');
  });

  it('when user enter value in input then handle change is called', () => {
    // mock input input and Enter events
    const mockEvent = {
      target: {
        value: 'Test'
      }
    };
    wrapper.find('input').simulate('change', mockEvent);
    expect(mockEvent.target.value === 'Test');
  });
});
