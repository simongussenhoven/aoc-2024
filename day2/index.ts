const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');
const lines = data.split('\n').map((l: string) => l.split(' ').map((n: string) => Number(n)))

const nextIsHigher = (a: number, b: number) => b > a
const nextIsLower = (a: number, b: number) => b < a
const diffIsSafe = (a: number, b: number) => Math.abs(a - b) > 0 && Math.abs(a - b) < 4

const lineIsSafe = (line: number[]) => {
  const dir = line[0] < line[1] ? 'asc' : 'desc'

  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i];
    const b = line[i + 1];

    if (dir === 'asc') {
      if (nextIsLower(a, b) || !diffIsSafe(a, b)) return false;
    }
    if (dir === 'desc') {
      if (nextIsHigher(a, b) || !diffIsSafe(a, b)) return false;
    }
  }
  return true;
}

const lineIsKindOfSafe = (line: number[]) => {
  for (let i = 0; i <= line.length; i++) {
    const newLine = line.filter((l: number, idx: number) => idx !== i)
    if (lineIsSafe(newLine)) {
      return true
    };
  }
  return false;
}

// part 1
let safeLines = 0;
lines.forEach((line: number[]) => {
  if (lineIsSafe(line)) safeLines = safeLines + 1;
})
console.log(safeLines)

// part 2
let kindOfSafeLines = 0
lines.forEach((line: number[]) => {
  if (lineIsSafe(line) || lineIsKindOfSafe(line)) kindOfSafeLines = kindOfSafeLines + 1;
})
console.log(kindOfSafeLines)