let rootPath = "/";
let currentPath = rootPath;

export function getCwd() {
  return currentPath;
}

export function setCwd(path: string) {
  currentPath = path;
}

export function getRootPath() {
  return rootPath;
}
