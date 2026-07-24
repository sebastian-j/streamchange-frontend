import styled from 'styled-components';
import { getSafeColor } from '../../utils/colors';

type Size = 'tiny' | 'small' | 'large';

const DIMENSIONS: Record<Size, { diameter: string; fontSize: string }> = {
  tiny: { diameter: '32px', fontSize: '14px' },
  small: { diameter: '40px', fontSize: '18px' },
  large: { diameter: '70px', fontSize: '32px' },
};

export const AvatarFallback = styled.div<{ $userColor?: string; $size?: Size }>`
  align-items: center;
  background: ${(props) => props.theme.iconButtonBackground};
  border-radius: 50%;
  color: ${(props) =>
    props.$userColor
      ? getSafeColor(props.$userColor, props.theme.panelBackground)
      : props.theme.staticTextColor};
  display: flex;
  flex-shrink: 0;
  font-size: ${(props) => DIMENSIONS[props.$size ?? 'small'].fontSize};
  font-weight: 700;
  height: ${(props) => DIMENSIONS[props.$size ?? 'small'].diameter};
  justify-content: center;
  user-select: none;
  width: ${(props) => DIMENSIONS[props.$size ?? 'small'].diameter};
`;