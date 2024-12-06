const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

const grid = data.split("\r\n").map((line: any) => line.split(""))
let count = 0;

const words = ["XMAS", "SAMX"]

const directions = [
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 }
]

// part 1
const checkWords = (arr: string[][]) => {
  arr.forEach((word) => {
    if (words.includes(word.join(""))) count++
  })
}
const checkRow = (row: string[], charI: number) => {
  const forward = row.slice(charI, charI + 4);
  const backward = row.slice(charI - 3, charI + 1)
  checkWords([forward, backward])
}

const checkVertical = (rowI: number, charI: number) => {
  const vertical = grid.map((row: string[]) => row[charI])
  checkRow(vertical, rowI)
}

const checkDiagonal = (rowI: number, charI: number) => {
  const diagonalWords: string[][] = [];

  directions.forEach(dir => {
    const wordArr: string[] = []
    for (let i = 0; i <= 3; i++) {
      if (grid[rowI + (i * dir.y)] && grid[rowI + (i * dir.y)][charI + (i * dir.x)]) {
        wordArr.push(grid[rowI + (i * dir.y)][charI + (i * dir.x)])
      }
    }
    diagonalWords.push(wordArr)
  })
  checkWords(diagonalWords)
}

let masCount = 0;
const checkForMas = (rowI: number, charI: number) => {
  const masses = ["SAM", "MAS"]
  if (masses.includes(getWord(rowI, charI, 1)) && masses.includes(getWord(rowI, charI, -1))) {
    masCount++
  }
}


const getWord = (rowI: number, charI: number, mul: number) => {
  const word: string[] = []
  for (let i = -1; i <= 1; i++) {
    if (grid[rowI + i] && grid[rowI + i][charI + i]) {
      word.push(grid[rowI + i][charI + i * mul])
    }
  }
  return word.join("")
}

grid.forEach((row: string[], rowI: number) => {
  row.forEach((char: string, charI: number) => {
    if (char === "X") {
      checkRow(row, charI)
      checkVertical(rowI, charI)
      checkDiagonal(rowI, charI)
    }
    if (char === "A") {
      checkForMas(rowI, charI)
    }
  })
})

// part 1
console.log(count)

//part2
console.log(masCount)