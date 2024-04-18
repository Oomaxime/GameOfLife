const mainGrid = document.getElementById("mainGrid");

const numRows = 50;
const numCols = 50;

for (let x = 0; x < numRows; x++) {
  for (let y = 0; y < numCols; y++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("dead");
    cell.setAttribute("x", x);
    cell.setAttribute("y", y);
    mainGrid.appendChild(cell);
  }
}
const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const row = parseInt(cell.getAttribute("x"));
    const col = parseInt(cell.getAttribute("y"));
    console.log(`Clicked cell at row ${row}, column ${col}`);
    cell.classList.toggle("alive");
  });
});

function lifeCheck() {
  cells.forEach((cell) => {
    const row = parseInt(cell.getAttribute("x"));
    const col = parseInt(cell.getAttribute("y"));
    const nbrNeighbors = countAliveNeighbors(row, col);
    if (cell.classList.contains("alive")) {
      if (nbrNeighbors < 2 || nbrNeighbors > 3) {
        cell.classList.remove("alive");
      }
    } else {
      if (nbrNeighbors === 3) {
        cell.classList.add("alive");
      }
    }
  });
}

function countAliveNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const neighborRow = row + i;
      const neighborCol = col + j;
      if (
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols
      ) {
        const neighborCell = document.querySelector(
          `.cell[x="${neighborRow}"][y="${neighborCol}"]`
        );
        if (neighborCell.classList.contains("alive")) {
          count++;
        }
      }
    }
  }
  return count;
}

const run = document.getElementById("run");

run.addEventListener("click", () => {
  lifeCheck();
});
