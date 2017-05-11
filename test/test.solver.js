const expect = require("chai").expect;
const deepequal = require('deep-equal');

const solver = require("./../src/solver.js");

it("solver simple true", function() {
  const input = [0, 1, 2, undefined];
  expect(solver.solved(input)).to.equal(true);
});

it("solver simple more", function() {

  let input = [0, 1, 2, 3];
  expect(solver.solved(input)).to.equal(false);

  input = [0, 1, 2];
  expect(solver.solved(input)).to.equal(false);

  input = [0, 1, 1, undefined];
  expect(solver.solved(input)).to.equal(false);

  input = [0, 1, 2, undefined, undefined];
  expect(solver.solved(input)).to.equal(false);

  input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, undefined];
  expect(solver.solved(input)).to.equal(true);

});

it("solver distance", function() {
  expect(solver.manhattan_dist(4, 0, 15)).to.equal(6);
  expect(solver.manhattan_dist(4, 15, 0)).to.equal(6);

  expect(solver.manhattan_dist(4, 0, 12)).to.equal(3);
  expect(solver.manhattan_dist(4, 12, 0)).to.equal(3);

  expect(solver.manhattan_dist(4, 5, 14)).to.equal(3);
  expect(solver.manhattan_dist(4, 14, 5)).to.equal(3);

  expect(solver.manhattan_dist(4, 4, 6)).to.equal(2);
  expect(solver.manhattan_dist(4, 6, 4)).to.equal(2);

  expect(solver.manhattan_dist(4, 4, 9)).to.equal(2);
  expect(solver.manhattan_dist(4, 9, 4)).to.equal(2);

  expect(solver.manhattan_dist(4, 5, 9)).to.equal(1);
  expect(solver.manhattan_dist(4, 9, 5)).to.equal(1);

  expect(solver.manhattan_dist(4, 10, 9)).to.equal(1);
  expect(solver.manhattan_dist(4, 9, 10)).to.equal(1);

});

it("permutations UDLR", function() {
     const puzzle = { positions: [0, 1, 2, 3, undefined, 4, 5, 6, 7], size: 3 };

     const expected_permutations = [];

     expected_permutations.push({positions: [0, undefined, 2, 3, 1, 4, 5, 6, 7], size: 3 });
     expected_permutations.push({positions: [0, 1, 2, undefined, 3, 4, 5, 6, 7], size: 3 });
     expected_permutations.push({positions: [0, 1, 2, 3, 4, undefined, 5, 6, 7], size: 3 });
     expected_permutations.push({positions: [0, 1, 2, 3, 6, 4, 5, undefined, 7], size: 3 });

     const permutations = solver.permutations(puzzle);

     expect(permutations.length).to.equal(4);
     expect(permutations.some(item => deepequal(item, expected_permutations[0]))).to.equal(true);
     expect(permutations.some(item => deepequal(item, expected_permutations[1]))).to.equal(true);
     expect(permutations.some(item => deepequal(item, expected_permutations[2]))).to.equal(true);
     expect(permutations.some(item => deepequal(item, expected_permutations[3]))).to.equal(true);

   });

it("permutations DR", function() {
  const puzzle = { positions: [undefined, 0, 1, 2, 3, 4, 5, 6, 7], size: 3 };

  const expected_permutations = [];

  expected_permutations.push({positions: [0, undefined, 1, 2, 3, 4, 5, 6, 7], size: 3 });
  expected_permutations.push({positions: [2, 0, 1, undefined, 3, 4, 5, 6, 7], size: 3 });

  const permutations = solver.permutations(puzzle);

  expect(permutations.length).to.equal(2);
  expect(permutations.some(item => deepequal(item, expected_permutations[0]))).to.equal(true);
  expect(permutations.some(item => deepequal(item, expected_permutations[1]))).to.equal(true);

});

it("permutations UL", function() {
  const puzzle = { positions: [0, 1, 2, 3, 4, 5, 6, 7, undefined], size: 3 };

  const expected_permutations = [];

  expected_permutations.push({positions: [0, 1, 2, 3, 4, 5, 6, undefined, 7], size: 3 });
  expected_permutations.push({positions: [0, 1, 2, 3, 4, undefined, 6, 7, 5], size: 3 });

  const permutations = solver.permutations(puzzle);

  expect(permutations.length).to.equal(2);
  expect(permutations.some(item => deepequal(item, expected_permutations[0]))).to.equal(true);
  expect(permutations.some(item => deepequal(item, expected_permutations[1]))).to.equal(true);

});

it("estimate", function() {
  let puzzle = { positions: [0, 1, 2, 3, 4, 5, 6, 7, undefined], size: 3 };
  expect(solver.estimate(puzzle)).to.equal(0);
  puzzle = { positions: [0, 1, 2, 3, 4, 5, 6, undefined, 7], size: 3 };
  expect(solver.estimate(puzzle)).to.equal(2);
  puzzle = { positions: [1, 0, 2, 3, 4, 5, 6, undefined, 7], size: 3 };
  expect(solver.estimate(puzzle)).to.equal(4);
  puzzle = { positions: [4, 1, 2, 3, 0, 5, 6, undefined, 7], size: 3 };
  expect(solver.estimate(puzzle)).to.equal(6);
  puzzle = { positions: [4, 6, 2, 3, 0, 5, 1, undefined, 7], size: 3 };
  expect(solver.estimate(puzzle)).to.equal(12);
});

it("solve", function() {

  let puzzle = { positions: [0, 1, 2, 3, 4, undefined, 6, 7, 5], size: 3 };
  let solved = solver.solve(puzzle);

  expect(solved.moves).to.equal(1);
  expect(solver.solved(solved.current.positions)).to.equal(true);

  puzzle = { positions: [0, 1, 2, 3, 4, 5, 6, 7, undefined], size: 3 }
  solved = solver.solve(puzzle);

  expect(solved.moves).to.equal(0);
  expect(solver.solved(solved.current.positions)).to.equal(true);

  puzzle = { positions: [5, undefined, 3, 2, 4, 0, 1, 6, 7], size: 3 };
  solved = solver.solve(puzzle);
  expect(solved.moves).to.equal(19);
  expect(solver.solved(solved.current.positions)).to.equal(true);

  puzzle = { positions: [4, 0, 6, 2, 8, 1, 10, 3, 12, 5, 14, 7, undefined, 9, 13, 11], size: 4 };
  solved = solver.solve(puzzle);
  expect(solver.solved(solved.current.positions)).to.equal(true);

});
