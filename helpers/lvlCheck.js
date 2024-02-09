export default function lvlCheck(item, cell, title) {
  let cellCount = cell;
  let titleSize = title;
  if (item === 'medium') {
    cellCount = 10;
    titleSize = 70;
  } else if (item === 'hard') {
    cellCount = 15;
    titleSize = 90;
  } else {
    cellCount = 5;
    titleSize = 70;
  }
  return { cellCount, titleSize };
}
