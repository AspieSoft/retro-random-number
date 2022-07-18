const RetroRandom = (function () {
  return function (seed, consistant = false, startTime) {
    const callStart = Date.now();
    if (!startTime) {
      startTime = callStart;
    }

    // ensure seed is 10 digits
    let time = callStart.toString();
    if (seed) {
      time = seed.toString() + time;
    }
    seed = '';
    for (let i = 0; i < 10; i++) {
      if (!time[i] && time[i] !== 0) {
        seed += Math.random();
      } else {
        seed += time[i];
      }
    }
    const origSeed = Number(seed);
    seed = seed.split('').map((n) => Number(n));

    function genRand(size, offset = 0) {
      let rand;
      if (Number(consistant)) {
        let now = startTime + (Date.now() - callStart);
        now /= Number(consistant);
        now = Math.abs(Math.floor(now)).toString().split('').reverse();

        let rSeed = '0.';
        for (let i = 0; i < now.length; i++) {
          rSeed += seed[now[i]];
        }

        rand = Math.floor(Number(rSeed) * Math.pow(10, size + offset)).toString();
      } else if (!consistant) {
        rand = Math.floor(Math.random() * Math.pow(10, size + offset)).toString();
      } else {
        rand = Math.floor(Number('0.' + seed.join('')) * Math.pow(10, size + offset)).toString();
      }
      while (rand.length < size) {
        rand = '0' + rand;
      }
      while (rand.length > size) {
        rand = rand.replace(/^[0-9]/, '');
      }
      return rand;
    }

    // let randSize = Math.max(3, Math.floor(Math.random() * 10));
    let randSize = 3;
    // let rand = Math.min(randSize - 1, Math.floor(Math.random() * 10));
    let rand = 0;
    let rand1, rand2, rand3, rand4, rand5;
    if (!consistant) {
      rand1 = genRand(randSize);
      rand2 = genRand(randSize);
      rand3 = genRand(randSize * 2);
      rand4 = genRand(randSize * 2);
      rand5 = genRand(randSize * 2);
    } else {
      rand1 = genRand(randSize, 1);
      rand2 = genRand(randSize, 3);
      rand3 = genRand(randSize * 2, 2);
      rand4 = genRand(randSize * 2, 4);
      rand5 = genRand(randSize * 2, 5);
    }

    // let calls = Math.floor(Math.random() * 10);
    let calls = 0;

    function nextInt(size) {
      calls++;
      if (calls > 25) {
        /* rand1 = genRand(randSize);
        rand2 = genRand(randSize);
        rand3 = genRand(randSize * 2);
        rand4 = genRand(randSize * 2);
        rand5 = genRand(randSize * 2); */

        if (!consistant) {
          rand1 = genRand(randSize);
          rand2 = genRand(randSize);
          rand3 = genRand(randSize * 2);
          rand4 = genRand(randSize * 2);
          rand5 = genRand(randSize * 2);
        } else {
          rand1 = genRand(randSize, 1);
          rand2 = genRand(randSize, 3);
          rand3 = genRand(randSize * 2, 2);
          rand4 = genRand(randSize * 2, 4);
          rand5 = genRand(randSize * 2, 5);
        }

        // calls = Math.floor(Math.random() * 10);
        calls = 0;
      }

      // shuffle seed
      seed[0] = (seed[0] + rand1[rand]).toString();
      seed[0] = Number(seed[0][seed[0].length - 1]);
      for (let i = 1; i < 10; i++) {
        seed[i] = (seed[i] + seed[i - 1]).toString();
        seed[i] = Number(seed[i][seed[i].length - 1]);
      }

      // get int at random spot
      let r = '';
      let loops = 0;
      let repeat = null;
      for (let i = rand2[rand]; i < rand2[rand] + size; i++) {
        loops++;
        if (loops > 10) {
          repeat = size - 10;
          break;
        } else if (i >= 10) {
          r += seed[i - 10];
        } else {
          r += seed[i];
        }
      }

      // get a new int if number if size is greater than 10
      if (repeat) {
        r += nextInt(repeat);
      }

      // increase rand pos
      rand++;
      if (rand >= randSize) {
        // rand = Math.min(randSize - 1, Math.floor(Math.random() * 10));
        rand = 0;
      }

      return r;
    }

    function getRand(min = 0, max = 0, decimal = 0, decimalMin = 0) {
      let minS = min.toString();
      let maxS = max.toString();
      let n = 0;
      if (minS.startsWith('-')) {
        minS = minS.replace('-', '');
        n++;
      }
      if (maxS.startsWith('-')) {
        maxS = maxS.replace('-', '');
        n++;
      }

      let minLength = Math.min(minS.length, maxS.length);
      let maxLength = Math.max(minS.length, maxS.length);
      let maxLengthD = maxLength + decimal;

      let int = Number(nextInt(maxLengthD));
      let loops = 100;
      while (Number.isNaN(int) && loops-- > 0) {
        int = Number(nextInt(maxLengthD));
      }
      if (Number.isNaN(int)) {
        return NaN;
      }
      int = int.toString();

      let res = '';
      let r4 = rand;
      for (let i = 0; i < maxLength; i++) {
        /* if(rand4[r4] % 2 === 0 || rand4[r4 + randSize] % 2 === 0) {
          let n = (Number(int[i]) + Number(rand4[rand + randSize])).toString();
          if(n.length > 1) {
            n = n[n.length - 1];
          }
          res += n;
        } else {
          res += int[i];
        } */
        res += int[i];

        if (i >= minLength && rand4[r4] % 2 === 0 && rand4[r4 + randSize] % 2 === 0) {
          break;
        }
        r4++;
        if (r4 >= randSize) {
          r4 = 0;
        }
      }

      if (decimal > 0) {
        let d = '';
        let dr = rand;
        for (let i = 0; i < decimal; i++) {
          if (i >= decimalMin && rand3[dr] % 2 === 0 && rand3[dr + randSize] % 2 === 0) {
            break;
          }
          dr++;
          if (dr >= randSize) {
            dr = 0;
          }
          d += int[i + maxLength];
        }
        if (d !== '') {
          res += '.' + d;
        }
      }

      res = Number(res);
      if (Number.isNaN(res)) {
        return getRand(min, max, decimal, decimalMin);
      }

      if (n === 1) {
        if (min < 0 && res > Math.abs(min)) {
          return res;
        } else if (max < 0 && res > Math.abs(max)) {
          return res;
        } else if (min > 0 && res > Math.abs(min)) {
          return res * -1;
        } else if (max > 0 && res > Math.abs(max)) {
          return res * -1;
        } else if (rand5[rand] % 2 === 0 || rand5[rand + randSize] % 2 === 0) {
          return res * -1;
        }
      } else if (n === 2) {
        res *= -1;
      }

      if (min < res.toString().length && rand4[rand] % seed[rand] < 2) {
        res = Number(res.toString().replace(/^[0-9]/, ''));
      }

      return res;
    }

    const func = function (min = 0, max = 0, decimal = 0, decimalMin = 0) {
      if (min > max) {
        [min, max] = [max, min];
      }
      if (decimal < decimalMin) {
        [decimal, decimalMin] = [decimalMin, decimal];
      }

      let rand = getRand(min, max, decimal, decimalMin);

      while (rand < min) {
        rand += min;
      }
      while (rand > max) {
        rand -= max;
      }

      if (rand < min) {
        rand = min;
      } else if (rand > max) {
        rand = max;
      }

      rand = rand.toString();
      if (rand.includes('.')) {
        rand = rand.split('.');
        rand[1] = rand[1].split('');
        while (rand[1].length > decimal && rand[1].length > 0) {
          rand[1].pop();
        }
        rand[1] = rand[1].join('');
        rand = rand.join('.');
      }

      return Number(rand);
    };

    func.seed = function () {
      return Number(seed.join(''));
    };

    func.origSeed = function () {
      return origSeed;
    };

    func.startTime = function () {
      return startTime;
    };

    func.callTime = function () {
      return callStart;
    };

    return func;
  };
})();

if (typeof window !== 'undefined') {
  window.RetroRandom = RetroRandom;
} else if (typeof module !== 'undefined') {
  module.exports = RetroRandom;
}
