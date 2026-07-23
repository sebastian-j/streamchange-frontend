import styled from 'styled-components';
import { getSafeColor } from '../../../utils/colors';

export const AvatarFallback = styled.div<{ $userColor?: string }>`
  align-items: center;
  background: ${(props) => props.theme.iconButtonBackground};
  border-radius: 50%;
  color: ${(props) =>
    props.$userColor
      ? getSafeColor(props.$userColor, props.theme.panelBackground)
      : props.theme.staticTextColor};
  display: flex;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  user-select: none;
  width: 40px;
`;