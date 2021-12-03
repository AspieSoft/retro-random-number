if(typeof module !== 'undefined') {
  const RetroRandom = require('./script.min');
  global.RetroRandom = RetroRandom;
}

const numbers = [];
const numbers2 = [];
const seeds = [];
let m = 0;
let m2 = 0;
let s = 0;

let r = RetroRandom(1234567890);
for(let i = 0; i < 1000; i++) {
  let seed = r.seed();
  let n = r(0, 1000);
  let n2 = RetroRandom(1234567890)(0, 1000);
  if(numbers.includes(n)) {
    m++;
  }
  if(numbers2.includes(n2)) {
    m2++;
  }
  if(seeds.includes(seed)) {
    s++;
  }
  numbers.push(n);
  numbers2.push(n2);
  seeds.push(seed);
}

console.log('next int repeats', (m / 10) + '%', '(lower is better)')
console.log('new seed repeats', (m2 / 10) + '%', '(higher is better)')
console.log('seed repeats', (s / 10) + '%', '(0 is best)')
