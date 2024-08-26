import fs from "indexeddb-fs";

let rootPath = "root";
let currentPath = rootPath;
let defaultFiles = [
  {
    name: "README.md",
    content:
      "welcome to phantom! it seems you found the `cat` command already :)\rwhy not try `cowsay`?",
  },
];

export async function initFs() {
  const directoryExists = await fs.isDirectory(rootPath);

  // Create a new directory if it doesn't exist
  if (!directoryExists) {
    await fs.createDirectory(rootPath);
    console.log(`Created root path: ${rootPath}`);
  }

  await Promise.all(
    defaultFiles.map(async (file) => {
      try {
        await fs.writeFile(`${rootPath}/${file.name}`, file.content);
      } catch (error) {
        console.error(`Error writing file ${file.name}:`, error);
      }
    })
  );
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
