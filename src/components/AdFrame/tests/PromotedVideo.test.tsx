import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import PromotedVideo from '../PromotedVideo';

describe('<PromotedVideo />', () => {
  it('should render and match the snapshot', () => {
    const { container } = render(<PromotedVideo videoId="jNQXAC9IVRw" />);
    expect(container).toMatchSnapshot();
  });
});
