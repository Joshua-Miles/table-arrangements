import Color from 'color'

const ratio = 0.618033988749895;
const saturation = 0.5;
const value = 0.95;

let hue   = Math.random();
export function randomColor () {
  hue += ratio;
  hue %= 1;

  return Color({
    h: hue * 360,
    s: saturation * 100,
    v: value * 100
  }).hex();
};