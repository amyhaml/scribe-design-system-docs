import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const DEFAULT_REPOSITORY = "amyhaml/scribe-design-system-docs";
export const DEFAULT_BRANCH = "main";
export const GUIDE_PATH = "AI-DESIGN-GUIDE.md";

function cachePath(cacheDirectory) {
  return path.join(cacheDirectory, "guidance-cache.json");
}

export function defaultCacheDirectory() {
  return (
    process.env.SCRIBE_DESIGN_GUIDANCE_CACHE_DIR ||
    path.join(
      process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache"),
      "scribe-design-guidance",
    )
  );
}

export function isApprovedGuidancePath(filePath) {
  return (
    filePath === GUIDE_PATH ||
    /^components\/[a-z0-9-]+\.md$/i.test(filePath) ||
    /^foundations\/[a-z0-9-]+\.md$/i.test(filePath)
  );
}

export function sanitizeGuidance(markdown) {
  const withoutFrontmatter = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
  const withoutCodeFences = withoutFrontmatter.replace(/```[\s\S]*?```/g, "");
  const lines = withoutCodeFences.split(/\r?\n/);
  const output = [];
  let skippingCodeSection = false;

  for (const line of lines) {
    if (/^##\s+code(?:\s|$)/i.test(line)) {
      skippingCodeSection = true;
      continue;
    }

    if (skippingCodeSection && /^##\s+/.test(line)) {
      skippingCodeSection = false;
    }

    if (skippingCodeSection) continue;
    if (/<!--\s*demo\s*-->/.test(line)) continue;
    if (/^\s*(?:\/\/\s*)?Source:\s*(?:Scribe\/)?(?:src|packages)\//i.test(line)) continue;
    if (/^\s*(?:import|export)\s/.test(line)) continue;

    output.push(line);
  }

  return output
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseTopicIndex(markdown) {
  const lines = markdown.split(/\r?\n/);
  const tableStart = lines.findIndex((line) =>
    /^\|\s*Topic\s*\|\s*Use for\s*\|\s*Sources\s*\|\s*$/i.test(line),
  );

  if (tableStart === -1 || !/^\|\s*:?-{3,}/.test(lines[tableStart + 1] || "")) {
    throw new Error(`Invalid ${GUIDE_PATH}: expected a Topic / Use for / Sources table.`);
  }

  const topics = [];
  for (let index = tableStart + 2; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith("|")) break;

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length !== 3) continue;
    const topic = cells[0].replace(/^`|`$/g, "").trim();
    const sourcePaths = [...cells[2].matchAll(/`([^`]+\.md)`/g)].map((match) => match[1]);

    if (
      !topic ||
      !cells[1] ||
      !sourcePaths.length ||
      sourcePaths.some((source) => !isApprovedGuidancePath(source))
    ) {
      throw new Error(`Invalid ${GUIDE_PATH} topic index row for "${topic || "unknown"}".`);
    }

    topics.push({ topic, useFor: cells[1].toLowerCase(), sourcePaths });
  }

  if (!topics.length) throw new Error(`Invalid ${GUIDE_PATH}: topic index is empty.`);
  return topics;
}

export function selectTopicPaths(topics, { query = "", topicIds = [] } = {}) {
  const requestedTopics = new Set(topicIds.filter(Boolean));
  const terms = query.toLowerCase().match(/[a-z0-9-]{3,}/g) || [];
  const selected = topics.filter((topic) => {
    if (requestedTopics.has(topic.topic)) return true;
    const searchable = `${topic.topic} ${topic.useFor}`;
    return terms.some((term) => searchable.includes(term));
  });

  const fallback = topics.filter(
    (topic) => topic.topic === "component-choice" || topic.topic === "accessibility",
  );
  const selectedTopics = selected.length ? selected : fallback;
  return [...new Set(selectedTopics.flatMap((topic) => topic.sourcePaths))];
}

function configuredRepository() {
  return process.env.SCRIBE_DESIGN_GUIDANCE_REPOSITORY || DEFAULT_REPOSITORY;
}

function configuredBranch() {
  return process.env.SCRIBE_DESIGN_GUIDANCE_BRANCH || DEFAULT_BRANCH;
}

function githubToken() {
  if (
    process.env.SCRIBE_DESIGN_GUIDANCE_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.GITHUB_TOKEN
  ) {
    return (
      process.env.SCRIBE_DESIGN_GUIDANCE_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_TOKEN
    );
  }

  try {
    return execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return undefined;
  }
}

function apiHeaders(token) {
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchJson(fetchImpl, url, headers) {
  const response = await fetchImpl(url, { headers });
  if (!response.ok) {
    const error = new Error(`GitHub request failed (${response.status}) for ${url}.`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function fetchRemoteDocument(fetchImpl, repository, revision, filePath, headers) {
  if (!isApprovedGuidancePath(filePath)) {
    throw new Error(`Refusing to load non-guidance path "${filePath}".`);
  }

  const url = `https://api.github.com/repos/${repository}/contents/content/${filePath}?ref=${revision}`;
  const response = await fetchJson(fetchImpl, url, headers);
  if (typeof response.content !== "string")
    throw new Error(`GitHub returned no content for ${filePath}.`);
  return Buffer.from(response.content.replace(/\n/g, ""), "base64").toString("utf8");
}

async function readCache(cacheDirectory) {
  try {
    return JSON.parse(await readFile(cachePath(cacheDirectory), "utf8"));
  } catch {
    return undefined;
  }
}

async function writeCache(cacheDirectory, cache) {
  await mkdir(cacheDirectory, { recursive: true });
  await writeFile(cachePath(cacheDirectory), `${JSON.stringify(cache, null, 2)}\n`);
}

function documentsForPaths(documentsByPath, sourcePaths) {
  const missing = sourcePaths.filter((sourcePath) => !documentsByPath[sourcePath]);
  if (missing.length) throw new Error(`Guidance is unavailable for: ${missing.join(", ")}.`);
  return sourcePaths.map((sourcePath) => ({
    path: sourcePath,
    content: documentsByPath[sourcePath],
  }));
}

async function loadRemoteGuidance(fetchImpl, repository, branch, headers, query, topicIds) {
  const commit = await fetchJson(
    fetchImpl,
    `https://api.github.com/repos/${repository}/commits/${branch}`,
    headers,
  );
  const revision = commit.sha;
  if (typeof revision !== "string" || !revision)
    throw new Error("GitHub did not return a branch revision.");

  const guide = sanitizeGuidance(
    await fetchRemoteDocument(fetchImpl, repository, revision, GUIDE_PATH, headers),
  );
  const sourcePaths = selectTopicPaths(parseTopicIndex(guide), { query, topicIds });
  const documentsByPath = { [GUIDE_PATH]: guide };

  for (const sourcePath of sourcePaths) {
    documentsByPath[sourcePath] = sanitizeGuidance(
      await fetchRemoteDocument(fetchImpl, repository, revision, sourcePath, headers),
    );
  }

  return { revision, documentsByPath, sourcePaths };
}

export async function resolveGuidance({
  query = "",
  topicIds = [],
  cacheDirectory = defaultCacheDirectory(),
  fetchImpl = globalThis.fetch,
  repository = configuredRepository(),
  branch = configuredBranch(),
} = {}) {
  const cached = await readCache(cacheDirectory);

  try {
    const token = githubToken();
    let remote;

    try {
      remote = await loadRemoteGuidance(
        fetchImpl,
        repository,
        branch,
        apiHeaders(token),
        query,
        topicIds,
      );
    } catch (error) {
      if (!token || ![401, 403].includes(error.status)) throw error;
      remote = await loadRemoteGuidance(
        fetchImpl,
        repository,
        branch,
        apiHeaders(),
        query,
        topicIds,
      );
    }

    const { revision, documentsByPath, sourcePaths } = remote;
    const cache = { revision, fetchedAt: new Date().toISOString(), documentsByPath };
    await writeCache(cacheDirectory, cache);
    return {
      source: "remote",
      revision,
      documents: documentsForPaths(documentsByPath, [GUIDE_PATH, ...sourcePaths]),
    };
  } catch (remoteError) {
    if (!cached?.revision || !cached?.documentsByPath?.[GUIDE_PATH]) {
      throw new Error(
        `Could not retrieve current Scribe guidance and no local cache is available. ${remoteError.message}`,
      );
    }

    const sourcePaths = selectTopicPaths(parseTopicIndex(cached.documentsByPath[GUIDE_PATH]), {
      query,
      topicIds,
    });
    return {
      source: "cache",
      revision: cached.revision,
      cachedAt: cached.fetchedAt,
      documents: documentsForPaths(cached.documentsByPath, [GUIDE_PATH, ...sourcePaths]),
    };
  }
}
