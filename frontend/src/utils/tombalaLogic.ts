export const generateTombalaCard = () => {
  // 3 rows, 9 columns
  const card: (number | null)[][] = Array.from({ length: 3 }, () => Array(9).fill(null));
  
  // Columns ranges: 1-9, 10-19, ..., 80-90
  const columnRanges = [
    [1, 9], [10, 19], [20, 29], [30, 39], [40, 49], 
    [50, 59], [60, 69], [70, 79], [80, 90]
  ];

  // 1. Pick at least one number for each column (9 numbers)
  // 2. Then pick 6 more numbers to reach 15 total (5 per row)
  
  const selectedNumbersByColumn: number[][] = Array.from({ length: 9 }, () => []);
  
  // Ensure each column has at least one number
  for (let col = 0; col < 9; col++) {
    const [min, max] = columnRanges[col];
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    selectedNumbersByColumn[col].push(num);
  }

  // Add 6 more numbers randomly to columns that have fewer than 3 numbers
  let extraNumbersCount = 0;
  while (extraNumbersCount < 6) {
    const col = Math.floor(Math.random() * 9);
    if (selectedNumbersByColumn[col].length < 3) {
      const [min, max] = columnRanges[col];
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!selectedNumbersByColumn[col].includes(num)) {
        selectedNumbersByColumn[col].push(num);
        extraNumbersCount++;
      }
    }
  }

  // Sort numbers in each column
  selectedNumbersByColumn.forEach(colArr => colArr.sort((a, b) => a - b));

  // Distribute numbers into rows
  // Rule: Each row must have 5 numbers.
  // This is a bit complex. Simple approach: try to place numbers.
  
  const rowCounts = [0, 0, 0];
  const allNumbersToPlace: { val: number, col: number }[] = [];
  selectedNumbersByColumn.forEach((colArr, colIdx) => {
    colArr.forEach(val => allNumbersToPlace.push({ val, col: colIdx }));
  });

  // Sort by column to make it easier to place
  // Try a recursive or iterative placement
  const placeNumbers = (index: number): boolean => {
    if (index === allNumbersToPlace.length) return true;
    
    const { val, col } = allNumbersToPlace[index];
    // Try to place in row 0, 1, or 2
    for (let row = 0; row < 3; row++) {
      if (rowCounts[row] < 5 && card[row][col] === null) {
        // If it's the second or third number in column, ensure it's in a lower row than previous
        const previousInCol = row > 0 ? card[row - 1][col] : null;
        const nextInCol = row < 2 ? card[row + 1][col] : null;
        
        // This is tricky because we don't know which row it belongs to yet.
        // Let's just place them and sort columns later if needed, but that's not how tombala works.
        // Usually, if a column has 2 numbers, they are in specific rows.
        
        card[row][col] = val;
        rowCounts[row]++;
        if (placeNumbers(index + 1)) return true;
        card[row][col] = null;
        rowCounts[row]--;
      }
    }
    return false;
  };

  placeNumbers(0);

  return card;
};

export const checkTombalaWin = (card: (number | null)[][], drawnNumbers: number[]) => {
  const drawnSet = new Set(drawnNumbers);
  
  let rowsCompleted = 0;
  for (let row = 0; row < 3; row++) {
    const rowNumbers = card[row].filter(n => n !== null) as number[];
    if (rowNumbers.every(num => drawnSet.has(num))) {
      rowsCompleted++;
    }
  }
  
  return {
    isBingo: rowsCompleted === 3, // Tulum
    isCinko1: rowsCompleted >= 1,  // 1. Çinko
    isCinko2: rowsCompleted >= 2,  // 2. Çinko
    rowsCompleted
  };
};
