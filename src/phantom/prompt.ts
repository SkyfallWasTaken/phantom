import { getCwd } from "./fs";
import chalk from "chalk";

/** Returns a prompt. */
export default function (lastExitCode: number): string {
  return `${chalk.bold.blue(getCwd())} ${lastExitCode === 0 ? chalk.bold.green("❯") : chalk.bold.red("❯")} `;
}
