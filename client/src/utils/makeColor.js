import Please from 'pleasejs';

export default function makeColor() {
  const colors = [];
  for (let i = 0; i < 100; i++) {
    colors.push(Please.make_color());
  }

  return colors;
}
