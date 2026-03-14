import type { LineValue } from './types';

/**
 * Modern Coin Method: 3 coins. 
 * Heads = 3, Tails = 2.
 * Total: 6, 7, 8, or 9.
 */
export function coinToss(): LineValue {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += Math.random() < 0.5 ? 2 : 3;
  }
  return sum as LineValue;
}

/**
 * Traditional Yarrow Stalk Method (Simulated probability).
 * 6: 1/16 (Old Yin)
 * 7: 5/16 (Young Yang)
 * 8: 7/16 (Young Yin)
 * 9: 3/16 (Old Yang)
 */
export function yarrowStalk(): LineValue {
  const r = Math.random() * 16;
  if (r < 1) return 6; // 1/16
  if (r < 4) return 9; // 3/16 (1+3=4)
  if (r < 11) return 8; // 7/16 (4+7=11)
  return 7; // 5/16 (11+5=16)
}

/**
 * Converts a set of 6 lines (6-9) to a binary ID.
 * 7 and 9 are Yang (1). 6 and 8 are Yin (0).
 */
export function linesToBinary(lines: LineValue[]): string {
  // Hexagram lines are usually counted from bottom (line 1) to top (line 6).
  // The binary in the dataset seems to follow a specific order.
  // Let's check how the dataset defines "111111" (Hexagram 1) and "000000" (Hexagram 2).
  // Usually, 1 is Yang and 0 is Yin.
  return lines.map(v => (v === 7 || v === 9 ? '1' : '0')).reverse().join('');
}

/**
 * Gets the relating (future) hexagram binary ID if lines change.
 * 6 becomes 7 (Young Yang), 9 becomes 8 (Young Yin).
 */
export function getFutureBinary(lines: LineValue[]): string | null {
  const hasChange = lines.some(v => v === 6 || v === 9);
  if (!hasChange) return null;

  const futureLines = lines.map(v => {
    if (v === 6) return 7;
    if (v === 9) return 8;
    return v;
  });
  return linesToBinary(futureLines as LineValue[]);
}

export function getChangingLines(lines: LineValue[]): number[] {
  return lines
    .map((v, i) => (v === 6 || v === 9 ? i + 1 : -1))
    .filter(v => v !== -1);
}
