import type { Command } from "../command.ts";
import fs from "indexeddb-fs";
import { join } from "pathe";
import { getCwd } from "../fs.ts";

const pyodideUrl = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";

const loadPyodideScript = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = pyodideUrl;
    script.onload = () => {
      window
        .loadPyodide()
        .then((pyodide) => {
          window.pyodide = pyodide;
          window.__pyodideLoaded = true;
          resolve();
        })
        .catch((e) => reject(e));
    };
    script.onerror = () => {
      reject(new Error("Failed to load Pyodide script"));
    };
    document.head.appendChild(script);
  });
};

const pre = `
import sys
from io import StringIO

# Redirect standard output
old_stdout = sys.stdout
sys.stdout = buffer = StringIO()
`;
const post = `
# Reset stdout
sys.stdout = old_stdout

# Get the output
output = buffer.getvalue()
output
`;

const command: Command = {
  meta: {
    name: "python",
    description: "run a python script",
    version: "1.0.0",
  },
  args: {},
  run: async (term, args) => {
    const newFileName = args._[1];
    if (!newFileName) {
      term.write(
        "python: missing file operand\r\nexample: python hello_world.py"
      );
      return 1;
    }

    if (!window.__pyodideLoaded) {
      term.write("downloading pyodide, this may take a while...\r\n");
      await loadPyodideScript();
      term.write("pyodide loaded!\r\n\r\n");
    }

    const path = join(getCwd(), newFileName);
    if (!(await fs.exists(path))) {
      term.write("python: file does not exist\r\n");
      return 1;
    } else if (await fs.isDirectory(path)) {
      term.write("python: not a file\r\n");
      return 1;
    }

    // Capture the Python output using a redirected output mechanism
    try {
      await window.pyodide.runPythonAsync(pre);
      await window.pyodide.runPythonAsync(await fs.readFile(path));
      const res = await window.pyodide.runPythonAsync(post);
      term.write(res.replace(/\n/g, "\r\n"));
    } catch (e) {
      term.write(`${e}`);
      return 1;
    }

    return 0;
  },
};

export default command;
