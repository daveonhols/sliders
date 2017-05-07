function solved(positions) {
  const last = undefined === (positions[positions.length - 1]);
  return positions.slice(0, -1).reduce((state, curr, idx) => curr === idx ? state : false, last);
}

function solve(puzzle) {

  let open = [];
  const closed = [];

  open.push({ current: puzzle, moves: 0, distance: estimate(puzzle) });



}

function estimate(puzzle) {
  return
    puzzle.positions.reduce((state, curr, idx) =>
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


