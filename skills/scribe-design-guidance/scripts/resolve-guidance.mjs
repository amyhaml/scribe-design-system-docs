#!/usr/bin/env node

import { resolveGuidance } from "./guidance-loader.mjs";

function readArguments(argv) {
  const options = { query: "", topicIds: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--query") options.query = argv[++index] || "";
    if (argument === "--topic") options.topicIds.push(argv[++index] || "");
  }
  return options;
}

try {
  const guidance = await resolveGuidance(readArguments(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(guidance, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
