# Retro Random

![npm version](https://img.shields.io/npm/v/retro-random)
![GitHub top language](https://img.shields.io/github/languages/top/aspiesoft/retro-random-number)
![GitHub license](https://img.shields.io/github/license/aspiesoft/retro-random-number)

![npm downloads](https://img.shields.io/npm/dw/retro-random)
![npm downloads](https://img.shields.io/npm/dm/retro-random)
![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/aspiesoft/retro-random-number)

[![donate](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-blue)](https://buymeacoffee.aspiesoft.com/)

## A random number generator for an old school video game feel

For old, 8-bit video games, random numbers were a bit more difficult for computers, and the randomness was somewhat predictable.

If your looking to build a video game, and want that old retro feel, this random number generator can help.

This module attempts to generate predictable results, while still being unique.

This random number generator also allows seeds. By default, the random seed is the current time in milliseconds.
The seed can be used to generate consistant results for a game level, but the output will still be slightely different.
Using the same seed adds a higher chance of getting the same output the first time twice.

There should be about an 82% chance of getting the same number on the first call of the same seed, and only a 42% chance of getting the same number on the next call.

## Installation

### node.js

```shell script
npm install retro-random
```

### cdn

```html
<script src="https://cdn.jsdelivr.net/gh/AspieSoft/retro-random-number@1.2.0/script.min.js"></script>
```

## Usage

```JavaScript

// require only if using node.js
const RetroRandom = require('retro-random');

let r = RetroRandom(); // create a new instance with a random time based seed

let r = RetroRandom(1234567890); // create a new instance with a specific seed

let r = RetroRandom(1234567890, true); // create a new instance with consistant results when recreated from the same seed

r(0, 1000); // pick a random number between 0 and 1000

r(-20, 50); // pick a random number between -20 and 50

r(0, 1, 3); // pick a random number between 0 and 1 with a 0 to 3 digit decimal

r(0, 1, 3, 2); // pick a random number between 0 and 1 with a 2 to 3 digit decimal

r(0, 1, 3, 3); // pick a random number between 0 and 1 with exactly a 3 digit decimal


r.origSeed() // return the original seed (output: 1234567890)

r.seed() // return a new seed that starts where you left off (output may very)

```
