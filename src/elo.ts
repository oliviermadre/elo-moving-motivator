export function updateElo(winnerElo: number, loserElo: number, k = 32): [number, number] {
    const expectedWin = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const newWinnerElo = winnerElo + k * (1 - expectedWin);
    const newLoserElo = loserElo + k * (0 - (1 - expectedWin));

    return [newWinnerElo, newLoserElo];
}