import styled, { keyframes } from 'styled-components';
import { getSafeColor } from '../../utils/colors';

export type Size = 'tiny' | 'small' | 'large';

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

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`;

export const AvatarSkeleton = styled.div<{ $size?: Size }>`
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.iconButtonBackground} 0%,
    ${(props) => props.theme.panelBackground} 50%,
    ${(props) => props.theme.iconButtonBackground} 100%
  );
  background-size: 200% 100%;
  border-radius: 50%;
  flex-shrink: 0;
  height: ${(props) => DIMENSIONS[props.$size ?? 'small'].diameter};
  width: ${(props) => DIMENSIONS[props.$size ?? 'small'].diameter};
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;
