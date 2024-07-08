let rootPath = "/";
let currentPath = rootPath;

export function getCurrentPath() {
  return currentPath;
}

export function setCurrentPath(path: string) {
  currentPath = path;
}

export function getRootPath() {
  return rootPath;
}
