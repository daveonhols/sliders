const hashes = require("hashes");
const winston = require("winston");

var logger = new (winston.Logger)({
    transports: [new (winston.transports.Console)({"timestamp":true})]
});

function hashCode(str) {
  let hash = 0;
  let i = 0;
  let chr = 0;
  let len = 0;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i += 1) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function solved(positions) {
  const last = undefined === (positions[positions.length - 1]);
  return positions.slice(0, -1).reduce((state, curr, idx) => curr === idx ? state : false, last);
}

function closestPuzzleSort(a, b) {
  return (a.moves + a.distance) - (b.moves + b.distance);
}

function getCheckPositions(size) {
  if (size === 3) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
  if (size === 4) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  }
  return [];
}

function chk_positions(a, b, size) {
  const chk_positions = getCheckPositions(size);
  return chk_positions.every(idx => a.positions[idx] === b.positions[idx]);
}

function visited(set, item) {
  return set.some(curr => chk_positions(curr.current, item, item.size));
}

function solve(puzzle) {

  let open = [];
  const closed = new hashes.HashSet();

  open.push({ current: puzzle, moves: 0, distance: estimate(puzzle) });

  let next = open.shift();
  closed.add(hashCode(JSON.stringify(next.current)));

  let best = 99999;
  let round = 0;
  while (next.distance > 0) {

    let expanded = permutations(next.current);

    if (next.distance < best) {
      best = next.distance;
    }

    expanded = expanded.filter(item => !closed.contains(hashCode(JSON.stringify(item))));

    expanded.forEach(item => {
        open.push({ current: item, moves: next.moves + 1, distance: estimate(item) });
        closed.add(hashCode(JSON.stringify(item)));
      });

    open.sort(closestPuzzleSort);

    next = open.shift();

    closed.add(hashCode(JSON.stringify(next.current)));
    round += 1;
  }

  return next;

}

function estimate(puzzle) {
  return puzzle.positions.reduce((state, curr, idx) =>
      curr === undefined
      ? state + manhattan_dist(puzzle.size, idx, puzzle.positions.length - 1)
      : state + manhattan_dist(puzzle.size, idx, curr), 0);
}

function manhattan_dist(size, from, to) {
  const from_row = Math.floor(from / size);
  const to_row = Math.floor(to / size);

  const from_col = from % size;
  const to_col = to % size;

  return Math.abs(from_col - to_col) + Math.abs(from_row - to_row);

}

function permutations(puzzle) {

  const space = puzzle.positions.indexOf(undefined);
  const space_row = Math.floor(space / puzzle.size);
  const space_col = space % puzzle.size;

  const can_swap = [];

  if (space_row > 0) {
    can_swap.push(space - puzzle.size);
  }
  if (space_row < (puzzle.size - 1)) {
    can_swap.push(space + puzzle.size);
  }
  if (space_col > 0) {
    can_swap.push(space - 1);
  }
  if (space_col < (puzzle.size - 1)) {
    can_swap.push(space + 1);
  }

  const new_positions = can_swap.map(item => swap(puzzle.positions.slice(0), space, item))
  const new_puzzles = new_positions.map(item => { return { positions: item, size: puzzle.size }; } );
  return new_puzzles;

}

function swap(positions, from, to) {
  const temp = positions[from];
  positions[from] = positions[to];
  positions[to] = temp;
  return positions;
}

exports.solved = solved;
exports.manhattan_dist = manhattan_dist;
exports.permutations = permutations;
exports.estimate = estimate;
exports.solve = solve;