import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount } from 'enzyme';

import SettingsDialog from '../index';

const renderer = new ShallowRenderer();

describe('<SettingsDialog />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<SettingsDialog />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it('should open dialog', () => {
    const wrapper = mount(<SettingsDialog />);
    expect(wrapper.find('div [role="presentation"]')).toHaveLength(0);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('div [role="presentation"]')).toHaveLength(3);
  });
});
