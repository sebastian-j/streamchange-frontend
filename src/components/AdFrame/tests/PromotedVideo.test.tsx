import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';

import PromotedVideo from '../PromotedVideo';

describe('<PromotedVideo />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<PromotedVideo videoId="jNQXAC9IVRw" />);
    expect(container).toMatchSnapshot();
  });
});
