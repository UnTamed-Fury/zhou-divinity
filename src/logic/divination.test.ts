import { describe, it, expect } from 'vitest';
import { linesToBinary, getFutureBinary, getChangingLines } from './divination';
import type { LineValue } from './types';

describe('Divination Logic', () => {
  it('should convert lines to binary correctly (Top-to-Bottom)', () => {
    // Hexagram 63 (After Completion): Water (010) over Fire (101)
    // Lines from bottom up: 1 (Yang), 2 (Yin), 3 (Yang), 4 (Yin), 5 (Yang), 6 (Yin)
    // 7 = Yang, 8 = Yin
    const lines: LineValue[] = [7, 8, 7, 8, 7, 8];
    expect(linesToBinary(lines)).toBe('010101');
  });

  it('should identify changing lines', () => {
    const lines: LineValue[] = [7, 6, 7, 8, 9, 8]; // L2 is 6 (Old Yin), L5 is 9 (Old Yang)
    expect(getChangingLines(lines)).toEqual([2, 5]);
  });

  it('should generate the correct future binary', () => {
    // Hexagram 1 (all Yang) with changing line 1
    // L1: 9 (Old Yang), L2-L6: 7 (Young Yang)
    const lines: LineValue[] = [9, 7, 7, 7, 7, 7];
    // Present: 111111
    // Future: L1 becomes 8 (Yin) -> 0, L2-L6 stay 1 -> 111110 (binary top-to-bottom)
    // Wait, lines are [L1, L2, L3, L4, L5, L6]
    // reverse() -> [L6, L5, L4, L3, L2, L1] -> [1, 1, 1, 1, 1, 0] -> 111110
    expect(getFutureBinary(lines)).toBe('111110');
  });

  it('should return null for future binary if no lines change', () => {
    const lines: LineValue[] = [7, 7, 8, 8, 7, 8];
    expect(getFutureBinary(lines)).toBeNull();
  });
});
