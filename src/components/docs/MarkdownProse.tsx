import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

import { CodeBlock } from "./CodeBlock";

export function MarkdownProse({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  if (!content.trim()) return null;

  return (
    <div
      className={cn(
        "docs-markdown max-w-3xl text-sm leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => (
            <strong className="font-medium text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em>{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          code: ({ className: codeClass, children }) => {
            const isBlock = codeClass?.includes("language-");
            if (isBlock) return <code className={codeClass}>{children}</code>;
            return (
              <code className="break-all rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            const child = children as ReactNode;
            if (
              child &&
              typeof child === "object" &&
              "props" in child &&
              child.props &&
              typeof child.props === "object" &&
              "className" in child.props &&
              typeof child.props.className === "string"
            ) {
              const lang = child.props.className.replace("language-", "") || "tsx";
              const code = String(
                "children" in child.props ? child.props.children : "",
              ).replace(/\n$/, "");
              return (
                <div className="not-prose my-4">
                  <CodeBlock code={code} language={lang} />
                </div>
              );
            }
            return <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4">{children}</pre>;
          },
          table: ({ children }) => (
            <div className="not-prose my-4 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[36rem] text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b bg-muted/40 font-medium text-foreground">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y text-muted-foreground">{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => <th className="px-3 py-2">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2">{children}</td>,
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">{children}</h3>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
