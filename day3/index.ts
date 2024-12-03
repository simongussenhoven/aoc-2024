const fs = require('fs');
const str = fs.readFileSync('./data.txt', 'utf8');
const array = str.split("")

const mul = (a: number, b: number) => a * b

// part 1
const muls = str.match(/\bmul\(\d{1,3},\s*\d{1,3}\)/g);
let result = 0;
muls.forEach((m: string) => result = result + eval(m))
console.log("part1", result)

// part 2
const str2 = str.replaceAll('do()', 'plz()').replaceAll("don't()", "donot()");
const functions = str2.match(/\bplz|donot|mul\(\d{1,3},\s*\d{1,3}\)/g);
let doMuls = true;
let result2 = 0;
functions.forEach((func: string) => {
  if (func === 'plz') return doMuls = true
  if (func === 'donot') return doMuls = false
  if (doMuls) return result2 = result2 + eval(func)
})
console.log('part2', result2)

