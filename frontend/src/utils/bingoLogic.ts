export const generateBingoCard = () => {
  const card = Array.from({ length: 5 }, () => Array(5).fill(0));
  
  for (let col = 0; col < 5; col++) {
    const min = col * 15 + 1;
    const max = (col + 1) * 15;
    const availableNumbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    
    for (let row = 0; row < 5; row++) {
      if (col === 2 && row === 2) {
        card[row][col] = 0; // Free space
        continue;
      }
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      card[row][col] = availableNumbers.splice(randomIndex, 1)[0];
    }
  }
  
  return card;
};

export const checkBingoWin = (card: number[][], drawnNumbers: number[]) => {
  const drawnSet = new Set(drawnNumbers);
  drawnSet.add(0); // Free space is always "drawn"

  // Check rows
  for (let i = 0; i < 5; i++) {
    if (card[i].every(num => drawnSet.has(num))) return true;
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    let columnWin = true;
    for (let row = 0; row < 5; row++) {
      if (!drawnSet.has(card[row][col])) {
        columnWin = false;
        break;
      }
    }
    if (columnWin) return true;
  }

  // Check diagonals
  let diag1 = true;
  let diag2 = true;
  for (let i = 0; i < 5; i++) {
    if (!drawnSet.has(card[i][i])) diag1 = false;
    if (!drawnSet.has(card[i][4 - i])) diag2 = false;
  }
  
  return diag1 || diag2;
};
