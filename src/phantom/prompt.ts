import { getCwd } from "./fs";
import chalk from "chalk";

/** Returns a prompt. */
export default function (): string {
  return `${chalk.bold.blue(getCwd())} ${chalk.bold.green("❯")} `;
}
