const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf8');

const array = data.split(/\s\s+/g);
const list1 = array.filter((n: any, i: any) => i % 2 === 0).filter((n: any) => n !== '').map((n: any) => Number(n)).sort();
const list2 = array.filter((n: any, i: any) => i % 2 !== 0).map((n: any) => Number(n)).sort();


// part 1
const getDistance = () => {
  let distance = 0;

  list1.forEach((num: number, i: number) => {
    num > list2[i] ? distance += (num - list2[i]) : distance += (list2[i] - num)
  })

  console.log(distance)
};
console.log('distance')
getDistance();

// part 2
const getSimilarity = () => {
  let similarityScore = 0;

  list1.forEach((num: number) => {
    const multiplier = list2.filter((num2: number) => num === num2).length;
    similarityScore += (num * multiplier)
  })

  console.log(similarityScore)
}
console.log('similarity')
getSimilarity()
