import { getCwd } from "./fs";

/** Returns a prompt. */
export default function (): string {
  return `$ ${getCwd()} `;
}
