import {Dimensions} from 'react-native';

// Reference width and height
const WIDTH = 392.72;
const HEIGHT = 787.63;

const {width, height} = Dimensions.get('window');

export const wp = len => {
  let w = len;
  if (isNaN(w)) (w = parseInt(w)), (w = (w * WIDTH) / 100);
  return w * (width / WIDTH);
};

export const hp = len => {
  let h = len;
  if (isNaN(h)) (h = parseInt(h)), (h = (h * HEIGHT) / 100);
  return h * (height / HEIGHT);
};
