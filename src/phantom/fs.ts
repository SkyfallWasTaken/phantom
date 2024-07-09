import fs from "indexeddb-fs";

let rootPath = "root";
let currentPath = rootPath;

export async function initFs() {
  const directoryExists = await fs.isDirectory(rootPath);

  // Create a new directory if it doesn't exist
  if (!directoryExists) {
    await fs.createDirectory(rootPath);
    console.log(`Created root path: ${rootPath}`);
  }
}

export function getCwd() {
  return currentPath;
}

export function setCwd(path: string) {
  currentPath = path;
}

export function getRootPath() {
  return rootPath;
}
