import { getCwd } from "./fs";
import chalk from "chalk";

/** Returns a prompt. */
export default function (lastExitCode: number): string {
  return `${chalk.bold.blue(getCwd())} ${lastExitCode === 0 ? chalk.bold.green("❯") : chalk.bold.red("❯")} `;
}

export const welcomePrompt = `${chalk.bold.green("Welcome to Phantom!")} ${chalk.bold.blue("Type 'help' for a list of commands.")}\r\n`;
