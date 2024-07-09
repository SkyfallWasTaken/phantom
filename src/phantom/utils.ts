import { closest as flClosest, distance } from "fastest-levenshtein";

export function findLongestStringLength(arr: string[]): number {
  let maxLength = 0;

  for (let str of arr) {
    if (str.length > maxLength) {
      maxLength = str.length;
    }
  }

  return maxLength;
}

export function closest(
  str: string,
  arr: readonly string[],
  minDistance = Infinity
): string | null {
  const closest = flClosest(str, arr);
  if (distance(str, closest) > minDistance) {
    return null;
  }
  return closest;
}
