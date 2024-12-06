const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

const grid = data.split('\n').map((r: string) => r.split(""))

let hasLeft = false;
let direction = 0;
let travelled = 0;

let x = 0;
let y = 0;

const checkHasLeft = () => {
  hasLeft = !grid[x][y]
}

const reset = () => {
  grid.forEach((row: string[], ri: number) => {
    row.forEach((char: string, ci: number) => {
      if (char === "^") {
        x = ci;
        y = ri;
      }
    })
  })
}

const nextStepBlocked = () => {
  try {
    if (direction === 0) return grid[y - 1][x] === "#";
    if (direction === 2) return grid[y + 1][x] === "#";
    if (direction === 1) return grid[y][x + 1] === "#";
    if (direction === 3) return grid[y][x - 1] === "#";
  }
  catch (err) {
    return false
  }
}

const changeDirection = () => {
  if (direction < 3) return direction = direction + 1
  direction = direction = 0;
}

const move = () => {
  if (hasLeft) return;
  if (grid[y][x] !== "0") {
    travelled++
    grid[y][x] = '0';
  }
  if (nextStepBlocked()) changeDirection();
  if (direction === 0) y--
  if (direction === 1) x++
  if (direction === 2) y++
  if (direction === 3) x--
  checkHasLeft()
}

reset();
for (let i = 0; i < Infinity; i++) {
  if (hasLeft) {
    console.log(travelled)
    break;
  };
  move();
}