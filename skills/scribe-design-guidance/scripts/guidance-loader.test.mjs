import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { isApprovedGuidancePath, resolveGuidance, sanitizeGuidance } from "./guidance-loader.mjs";

const guide = `# AI Design Guide

## Topic index

| Topic | Use for | Sources |
| --- | --- | --- |
| \`switch-checkbox\` | switch checkbox binary setting | \`components/switch.md\`, \`components/checkbox.md\` |
| \`accessibility\` | accessibility keyboard focus | \`components/checkbox.md\` |
`;

const documents = {
  "AI-DESIGN-GUIDE.md": guide,
  "components/switch.md":
    "---\ntitle: Switch\n---\n## Overview\nUse a switch for one setting.\n## Code\n```tsx\nimport BadPort from 'docs-port';\n```\n",
  "components/checkbox.md": "## Overview\nUse a checkbox for a set.\n",
};

const automaticUiGuide = `# AI Design Guide

## Topic index

| Topic | Use for | Sources |
| --- | --- | --- |
| \`component-choice\` | component choose setting editor form validation publish publishing content workflow feedback | \`components/switch.md\`, \`components/alert-bar.md\` |
| \`switch-checkbox\` | switch checkbox binary setting preference selection | \`components/switch.md\`, \`components/checkbox.md\` |
| \`snackbar-alert\` | snackbar alert banner validation status feedback publish publishing | \`components/snackbar.md\`, \`components/alert-bar.md\` |
| \`typography-layout\` | typography layout editor form setting content workflow | \`foundations/typography.md\`, \`foundations/spacing.md\` |
| \`semantic-color\` | color semantic validation publish publishing feedback | \`foundations/color.md\`, \`components/alert-bar.md\` |
`;

const automaticUiDocuments = {
  "AI-DESIGN-GUIDE.md": automaticUiGuide,
  "components/switch.md":
    "## Overview\nUse a switch for one independent setting.\n## Code\nNever expose this.\n",
  "components/checkbox.md": "## Overview\nUse a checkbox for a set.\n",
  "components/alert-bar.md": "## Overview\nUse inline alerts for validation.\n",
  "components/snackbar.md": "## Overview\nUse a snackbar for temporary feedback.\n",
  "foundations/typography.md": "## Overview\nUse established typography roles.\n",
  "foundations/spacing.md": "## Overview\nUse the spacing scale.\n",
  "foundations/color.md": "## Overview\nUse semantic color roles.\n",
};

function mockGithub(revision, sourceDocuments = documents, fail = false) {
  return async (url) => {
    if (fail) throw new Error("offline");
    if (url.includes("/commits/"))
      return new Response(JSON.stringify({ sha: revision }), { status: 200 });
    const pathMatch = url.match(/\/contents\/content\/(.+)\?ref=/);
    const filePath = decodeURIComponent(pathMatch?.[1] || "");
    return new Response(
      JSON.stringify({
        content: Buffer.from(sourceDocuments[filePath] || "", "utf8").toString("base64"),
      }),
      { status: 200 },
    );
  };
}

test("loads the relevant approved Markdown from a live GitHub revision and strips code", async () => {
  const cacheDirectory = await mkdtemp(path.join(os.tmpdir(), "scribe-guidance-"));
  try {
    const result = await resolveGuidance({
      query: "Should I use a switch or checkbox?",
      cacheDirectory,
      fetchImpl: mockGithub("revision-one"),
      repository: "owner/repo",
    });

    assert.equal(result.source, "remote");
    assert.equal(result.revision, "revision-one");
    assert.deepEqual(
      result.documents.map((document) => document.path),
      ["AI-DESIGN-GUIDE.md", "components/switch.md", "components/checkbox.md"],
    );
    assert.match(result.documents[1].content, /one setting/);
    assert.doesNotMatch(result.documents[1].content, /BadPort|import|## Code/);
  } finally {
    await rm(cacheDirectory, { recursive: true, force: true });
  }
});

test("uses the newly fetched revision rather than stale cache when published guidance changes", async () => {
  const cacheDirectory = await mkdtemp(path.join(os.tmpdir(), "scribe-guidance-"));
  try {
    await resolveGuidance({
      query: "switch",
      cacheDirectory,
      fetchImpl: mockGithub("revision-one"),
      repository: "owner/repo",
    });
    const updatedDocuments = {
      ...documents,
      "components/switch.md": "## Overview\nUse the updated switch guidance.\n",
    };
    const result = await resolveGuidance({
      query: "switch",
      cacheDirectory,
      fetchImpl: mockGithub("revision-two", updatedDocuments),
      repository: "owner/repo",
    });

    assert.equal(result.revision, "revision-two");
    assert.match(result.documents[1].content, /updated switch guidance/);
  } finally {
    await rm(cacheDirectory, { recursive: true, force: true });
  }
});

test("discloses cached guidance when remote access is unavailable", async () => {
  const cacheDirectory = await mkdtemp(path.join(os.tmpdir(), "scribe-guidance-"));
  try {
    await resolveGuidance({
      query: "switch",
      cacheDirectory,
      fetchImpl: mockGithub("cached-revision"),
      repository: "owner/repo",
    });
    const result = await resolveGuidance({
      query: "switch",
      cacheDirectory,
      fetchImpl: mockGithub("unused", documents, true),
      repository: "owner/repo",
    });

    assert.equal(result.source, "cache");
    assert.equal(result.revision, "cached-revision");
    assert.ok(result.cachedAt);
  } finally {
    await rm(cacheDirectory, { recursive: true, force: true });
  }
});

test("allows only guidance Markdown and rejects implementation paths", () => {
  assert.equal(isApprovedGuidancePath("components/switch.md"), true);
  assert.equal(isApprovedGuidancePath("foundations/color.md"), true);
  assert.equal(isApprovedGuidancePath("src/components/scribe/Switch.tsx"), false);
  assert.doesNotMatch(sanitizeGuidance("## Code\n```tsx\nimport x from 'y';\n```"), /import|Code/);
});

test("resolves current approved guidance for ordinary Scribe UI prompts", async () => {
  const cacheDirectory = await mkdtemp(path.join(os.tmpdir(), "scribe-guidance-"));
  const cases = [
    { query: "Add a binary setting", expected: "components/switch.md" },
    { query: "Build validation for an editor field", expected: "foundations/typography.md" },
    { query: "Select feedback after publishing", expected: "foundations/color.md" },
    { query: "Design a content-management form", expected: "foundations/spacing.md" },
  ];

  try {
    for (const { query, expected } of cases) {
      const result = await resolveGuidance({
        query,
        cacheDirectory,
        fetchImpl: mockGithub("current-revision", automaticUiDocuments),
        repository: "owner/repo",
      });

      assert.equal(result.source, "remote");
      assert.equal(result.revision, "current-revision");
      assert.ok(result.documents.some((document) => document.path === expected));
      assert.ok(result.documents.every((document) => !document.path.includes("src/")));
      assert.ok(
        result.documents.every((document) => !/## Code|Never expose/.test(document.content)),
      );
    }
  } finally {
    await rm(cacheDirectory, { recursive: true, force: true });
  }
});

test("skill metadata requires automatic Scribe UI guidance and retains explicit invocation", async () => {
  const skillDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const [skill, metadata] = await Promise.all([
    readFile(path.join(skillDirectory, "SKILL.md"), "utf8"),
    readFile(path.join(skillDirectory, "agents", "openai.yaml"), "utf8"),
  ]);

  assert.match(skill, /automatically for every Scribe UI request/i);
  assert.match(skill, /before proposing UI decisions or editing Scribe UI code/i);
  assert.match(skill, /\$scribe-design-guidance/);
  assert.match(metadata, /allow_implicit_invocation:\s*true/);
  assert.match(metadata, /Default design-decision guidance for Scribe UI work/);
});
