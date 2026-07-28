import styled from 'styled-components';
import { getSafeColor } from '../../../utils/colors';

export const ChannelName = styled.span<{ $userColor?: string }>`
  color: ${(props) =>
    props.$userColor
      ? getSafeColor(props.$userColor, props.theme.panelBackground)
      : props.theme.staticTextColor};
  font-size: 1rem;
`;
