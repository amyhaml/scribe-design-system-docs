---
name: scribe-design-guidance
description: Automatically use for any Scribe UI request that creates, changes, reviews, or proposes product interface work. Fetches the latest approved Scribe component, typography, color, spacing, elevation, radius, and accessibility guidance from the Design System Docs GitHub main branch before making UI decisions. Do not use for implementation imports, code, or docs-only component ports.
---

# Scribe Design Guidance

Use this skill automatically for every Scribe UI request, including product interface creation, modification, review, and design decisions. This includes requests for settings, editors, forms, validation, publishing, content workflows, feedback, navigation, and component selection.

Run it before proposing UI decisions or editing Scribe UI code. Use the retrieved guidance to select the appropriate component, distinguish related patterns, and apply approved typography, semantic color, spacing, elevation, radius, and accessibility guidance. For vague requests that do not clearly mention Scribe UI, `$scribe-design-guidance` is the deterministic explicit fallback.

## Retrieve Current Guidance

Run the resolver before answering or implementing a substantive Scribe UI request:

```bash
node "${CODEX_HOME:-$HOME/.codex}/skills/scribe-design-guidance/scripts/resolve-guidance.mjs" --query "<user question>"
```

For a specific authored topic, add `--topic <topic-id>`. The resolver reads only the published, allowlisted Markdown guidance in `amyhaml/scribe-design-system-docs` on `main`, and prints the Git revision, source status, and relevant documents as JSON.

For a private repository, use existing GitHub CLI authentication or set `SCRIBE_DESIGN_GUIDANCE_TOKEN`, `GH_TOKEN`, or `GITHUB_TOKEN`. For a public repository, the resolver uses unauthenticated GitHub API reads and automatically retries without a locally configured token if that token is rejected.

If remote retrieval fails, it may return the last successful cached revision. State clearly that the answer uses cached guidance and include that revision. If no relevant cached guidance exists, say that current guidance could not be retrieved instead of guessing.

## Authority And Boundaries

1. Treat explicit comparison rules in `AI-DESIGN-GUIDE.md` as the primary authority for component-choice questions.
2. Treat foundation guidance as the authority for typography, color, spacing, radius, and elevation.
3. Treat component guidance as the authority for component purpose, states, and usage.
4. State the relevant component choice, foundation rules, and accessibility or interaction constraints in the response or implementation rationale. Do not silently make a design decision when applicable guidance exists.
5. Never recommend documentation ports, `src/components/scribe`, Storybook demos, imports, source paths, or implementation code. This skill is design guidance only.
6. Never cite or load `## Code` sections, fenced code, or any `src/` content. If the vault does not define a decision, call that out and ask for the missing product or design context.

## Response Format

Use this compact structure:

1. **Recommendation**: name the component or foundation rule.
2. **Why / not instead**: explain the fit and the closest unsuitable alternative.
3. **Apply**: list relevant typography, semantic color, spacing, and interaction guidance.
4. **Accessibility**: state required focus, labeling, persistence, or status constraints.
5. **Sources**: list the current vault Markdown files and Git revision. Mark the result as cached when applicable.

Do not invent design-system rules from visual inference when the published guidance is silent.
