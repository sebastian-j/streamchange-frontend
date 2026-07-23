import chroma from 'chroma-js';

export function getSafeColor(originalColor: string, bgColor: string): string {
  if (!originalColor) return '';

  try {
    let color = chroma(originalColor);
    const background = chroma(bgColor || '#ffffff');
    const isLightBg = background.luminance() > 0.5;

    let iterations = 0;
    while (chroma.contrast(color, background) < 4.5 && iterations < 20) {
      if (isLightBg) {
        color = color.darken(0.2);
      } else {
        color = color.brighten(0.2);
      }
      iterations++;
    }

    return color.hex();
  } catch (e) {
    return originalColor;
  }
}
