import {getLetterMatchCount} from "./index";

describe('getLetterMatchCount()', () => {
  const secretWord = 'party';

  it('returns correct count when there are no matching letters', () => {
    const letterMathCount = getLetterMatchCount('bones', secretWord);
    expect(letterMathCount).toBe(0);
  });

  it('returns correct count when there are 3 matching letters', () => {
    const letterMathCount = getLetterMatchCount('train', secretWord);
    expect(letterMathCount).toBe(3);
  });

  it('returns correct count when there are duplicate matching letters in the guess', () => {
    const letterMathCount = getLetterMatchCount('parka', secretWord);
    expect(letterMathCount).toBe(3);
  });
});