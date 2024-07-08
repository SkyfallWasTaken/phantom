import fs from "indexeddb-fs";

/** Returns a prompt. */
export default function (): string {
  return `$ ${fs.rootDirectoryName} `;
}
