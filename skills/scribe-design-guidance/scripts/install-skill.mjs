#!/usr/bin/env node

import { cp, lstat, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const targetRoot = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const targetDirectory = path.join(targetRoot, "skills", "scribe-design-guidance");
const force = process.argv.includes("--force");

try {
  await lstat(targetDirectory);
  if (!force)
    throw new Error(`${targetDirectory} already exists. Re-run with --force to replace it.`);
  await rm(targetDirectory, { recursive: true, force: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

await cp(sourceDirectory, targetDirectory, { recursive: true });
process.stdout.write(`Installed Scribe Design Guidance to ${targetDirectory}\n`);
