const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

const rows = data.split('\r\n')
const orderings = rows.filter((r: string) => r.includes("|")).map((r: string) => r.split("|")).map((r: string[]) => r.map((s: string) => Number(s)));
const pages = rows.filter((r: string) => r.includes(",")).map((r: string) => r.split(",")).map((r: string[]) => r.map((s: string) => Number(s)));

// part 1
const orderedCorrectly = pages.filter((page: number[]) => {
  return page.every((pageNum: number, pageNumIndex: number) => {
    return orderings.filter((ordering: number[]) => ordering.includes(pageNum))
      .every((ordering: number[]) => {
        if (ordering.indexOf(pageNum) === 0) {
          return page.indexOf(ordering[1]) === -1 || page.indexOf(ordering[1]) > pageNumIndex;
        }
        if (ordering.indexOf(pageNum) === 1) {
          return page.indexOf(ordering[0]) === -1 || page.indexOf(ordering[0]) < pageNumIndex;
        }
      });
  });
});

let sum = 0;
orderedCorrectly.forEach((page: number[]) => {
  sum += page[Math.floor(page.length - 1) / 2]
});
console.log(sum);

// part 2
const orderedIncorrectly = pages.filter((page: number[]) => {
  return page.some((pageNum: number, pageNumIndex: number) => {
    return orderings.filter((ordering: number[]) => ordering.includes(pageNum))
      .some((ordering: number[]) => {
        if (ordering.indexOf(pageNum) === 0) {
          return page.indexOf(ordering[1]) !== -1 && page.indexOf(ordering[1]) < pageNumIndex;
        }
        if (ordering.indexOf(pageNum) === 1) {
          return page.indexOf(ordering[0]) !== -1 && page.indexOf(ordering[0]) > pageNumIndex;
        }
      });
  });
});

const resortedPages = orderedIncorrectly.map((page: number[]) => {
  return page.sort((a: number, b: number) => {
    return orderings.filter((ordering: number[]) => ordering.includes(a) && ordering.includes(b))
      .map((ordering: number[]) => ordering.indexOf(a) - ordering.indexOf(b))[0];
  });
});

let sum2 = 0;
resortedPages.forEach((page: number[]) => {
  sum2 += page[Math.floor(page.length - 1) / 2]
});
console.log(sum2);