const solver = require("./solver.js");

function generate(size) {
  const result = [];
  for (let i = 0; i < size - 1; i += 1) {
    result.push(i);
  }
  result.push(undefined);
  return result;
}

function shuffle(input) {
  let result = [];

  input.map(item => result.push(item));

  while (solver.solved(result)) {
    result = shuffleOnce(result);
  }
  return result;
}

function shuffleOnce(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}


exports.generate = generate;
exports.shuffle = shuffle;