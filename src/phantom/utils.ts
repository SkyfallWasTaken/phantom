export function findLongestStringLength(arr: string[]): number {
  let maxLength = 0;

  for (let str of arr) {
    if (str.length > maxLength) {
      maxLength = str.length;
    }
  }

  return maxLength;
}
