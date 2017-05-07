const expect = require("chai").expect;
const deepequal = require('deep-equal');

const generator = require("./../src/generator.js");

it("generator simple", function() {
  expect(deepequal(generator.generate(4), [0, 1, 2, undefined])).to.equal(true);
});

it("generate and shuffle", function() {
  const input = generator.generate(4);
  const shuffled = generator.shuffle(input);
  expect(deepequal(input, shuffled)).to.equal(false);
});

