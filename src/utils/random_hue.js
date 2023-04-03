/**
 * Generates a random hue value between 0 and 360 (inclusive) that is a multiple of 10.
 * @returns {number} A random hue value between 0 and 360 (inclusive) that is a multiple of 10.
 */
const randomHueValue = () => {
  const min = 0;
  const max = 36;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  const hueValue = randomNum * 10;
  return hueValue;
}

export default randomHueValue