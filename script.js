const target = document.querySelector('.targetColor');
const tiles = document.querySelectorAll('.colors .color');
let displayScore = document.querySelector('.score');
const reset = document.querySelector('.reset');
const click = document.querySelector('#click');
const correct = document.querySelector('#correct');
const wrong = document.querySelector('#wrong');
let stat = document.querySelector('.admin .status');
let colors = [];
let color;
let score = 0;
const excludedColors = [
  '#39ff14',
  ' #1b03a3',
  ' #ff10f0',
  ' #ff6700',
  ' #ff073a',
  '#00ffff',
];

color = targetColor();
target.style.backgroundColor = color;
console.log(color);
function targetColor() {
  do {
    color = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  } while (excludedColors.includes(color));

  return color;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function setColors(color) {
  while (colors.length < 5) {
    const random = getRandomColor();

    if (!colors.includes(random)) {
      colors.push(random);
    }
  }
  const randomIndex = Math.floor(Math.random() * (colors.length + 1));
  colors.splice(randomIndex, 0, color);
  return colors;
}

function assignColors(color, score) {
  const mainColor = color;
  accScore = score;
  tiles.forEach((tile, index) => {
    tile[index] = colors[index];

    tile.addEventListener('click', function () {
      tile.style.backgroundColor = tile[index];

      console.log(tile[index]);
      console.log(mainColor);

      if (tile[index] === mainColor) {
        tile.style.backgroundColor = tile[index];
        tile.style.outline = '5px solid white';
        tile.style.borderRadius = '25%';

        document.querySelector('.admin .status').textContent = '🎉CORRECT!';
        setTimeout(() => {
          removeStat();
        }, 1000);

        event.stopPropagation();
        wrong.pause();
        correct.play();
        accScore += 10; //add score
        displayScore.textContent = `SCORE : ${accScore}`;
        setTimeout(() => {
          runAgain(accScore);
        }, 1000);
      } else {
        event.stopPropagation();
        wrong.play();
        tile.style.outline = '5px solid red';
        tile.style.borderRadius = '25%';
        console.log('Oops');
        document.querySelector('.admin .status').textContent = '☹️WRONG!';
      }
    });
  });
  return accScore;
}
function removeStat() {
  document.querySelector('.admin .status').textContent = '';
}
function runAgain(score) {
  //reset target color

  color = '';
  color = targetColor();
  target.style.backgroundColor = color;

  //reset color array
  colors = [];
  setColors(color);

  //reset color buttons
  tiles.forEach((tile, index) => {
    tile.style.outline = '';
    tile.style.backgroundColor = excludedColors[index]; //return to default colors
  });

  //assign colors
  assignColors(color, score);
}
reset.addEventListener('click', function Reset(score) {
  accScore = 0;
  console.log(accScore, 'jjjj');
  click.play();
  document.querySelector('.admin .status').textContent = '';

  displayScore.textContent = 'SCORE: 0';
  tiles.forEach((tile, index) => {
    tile.style.backgroundColor = excludedColors[index]; //return to default colors
  });
  color = targetColor();
  target.style.backgroundColor = color;
  setColors(color);
});
console.log(colors);
setColors(color);
assignColors(color, score);
