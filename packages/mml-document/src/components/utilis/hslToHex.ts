export function hslToHex(hue: number, saturation: number, lightness: number) {
  const alpha = saturation * Math.min(lightness, 1 - lightness);
  const getF = (n: number) => {
    const k = (n + hue / 30) % 12;
    return (
      lightness - alpha * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
    );
  };
  const red = Math.round(255 * getF(0));
  const green = Math.round(255 * getF(8));
  const blue = Math.round(255 * getF(4));
  const hex =
    "#" +
    red.toString(16).padStart(2, "0") +
    green.toString(16).padStart(2, "0") +
    blue.toString(16).padStart(2, "0");
  return hex;
}
