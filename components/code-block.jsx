"use client";

import { useState } from "react";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { cn } from "@fumadocs/ui/cn";
import { Check, Clipboard } from "lucide-react";

export const BORED_BOT_ID = "1456564317494317197";

export function formatDiscordSlashCommand(text) {
  if (!text) return text;
  const lines = text.split("\n");
  const converted = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("/")) return line;

    const withoutSlash = trimmed.slice(1).trim();
    if (!withoutSlash) return line;

    const parts = withoutSlash.split(/\s+/);
    if (parts.length === 0 || !parts[0]) return line;

    const commandTokens = [];
    const argumentTokens = [];
    let isArg = false;

    for (const part of parts) {
      if (isArg) {
        argumentTokens.push(part);
      } else if (
        part.includes(":") ||
        part.startsWith("<") ||
        part.startsWith("[") ||
        commandTokens.length >= 3
      ) {
        isArg = true;
        argumentTokens.push(part);
      } else if (/^[a-z0-9_-]+$/i.test(part)) {
        commandTokens.push(part);
      } else {
        isArg = true;
        argumentTokens.push(part);
      }
    }

    if (commandTokens.length === 0) return line;

    const mention = `</${commandTokens.join(" ")}:${BORED_BOT_ID}>`;
    return argumentTokens.length > 0
      ? `${mention} ${argumentTokens.join(" ")}`
      : mention;
  });

  return converted.join("\n");
}

export function CommandCopyButton({ containerRef, className, ...props }) {
  const [checked, setChecked] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = async (e) => {
    const pre = containerRef.current?.getElementsByTagName("pre").item(0);
    if (!pre) return;

    const clone = pre.cloneNode(true);
    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
      node.replaceWith("\n");
    });

    const rawText = clone.textContent ?? "";
    const isSlash = rawText.trim().startsWith("/");
    const isAltOrShift = e.altKey || e.shiftKey;

    let textToCopy = rawText;
    let isDiscordMention = false;

    if (isSlash && !isAltOrShift) {
      textToCopy = formatDiscordSlashCommand(rawText);
      isDiscordMention = true;
    }

    try {
      if (
        typeof ClipboardItem !== "undefined" &&
        navigator.clipboard?.write &&
        isDiscordMention
      ) {
        try {
          const firstCommand = rawText.trim().slice(1).split(/\s+/)[0] || "";
          const slateFragment = [
            {
              type: "paragraph",
              children: [
                {
                  type: "commandMention",
                  commandId: BORED_BOT_ID,
                  commandName: firstCommand,
                  children: [{ text: "" }]
                },
                {
                  text: textToCopy.includes(">")
                    ? textToCopy.slice(textToCopy.indexOf(">") + 1)
                    : ""
                }
              ]
            }
          ];
          const encodedFragment = btoa(
            encodeURIComponent(JSON.stringify(slateFragment))
          );
          const htmlPayload = `<span data-slate-fragment="${encodedFragment}">${textToCopy}</span>`;

          const item = new ClipboardItem({
            "text/plain": new Blob([textToCopy], { type: "text/plain" }),
            "text/html": new Blob([htmlPayload], { type: "text/html" })
          });
          await navigator.clipboard.write([item]);
        } catch {
          await navigator.clipboard.writeText(textToCopy);
        }
      } else {
        await navigator.clipboard.writeText(textToCopy);
      }

      setCopiedType(isDiscordMention ? "discord" : "raw");
      setChecked(true);
      setTimeout(() => {
        setChecked(false);
        setCopiedType(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
    }
  };

  const tooltipText = checked
    ? copiedType === "discord"
      ? "Copied for Discord (prefilled for bored)"
      : "Copied to clipboard"
    : "Copy command";

  return (
    <button
      type="button"
      data-checked={checked || undefined}
      className={cn(
        buttonVariants({
          className:
            "hover:text-fd-accent-foreground data-checked:text-fd-accent-foreground transition-all duration-150",
          size: "icon-xs"
        }),
        className
      )}
      aria-label={tooltipText}
      title={tooltipText}
      onClick={handleCopy}
      {...props}
    >
      {checked ? (
        <Check className="size-3.5 text-emerald-400" />
      ) : (
        <Clipboard className="size-3.5" />
      )}
    </button>
  );
}

function CustomActions({ className, children }) {
  const containerRef = children?.props?.containerRef;
  return (
    <div className={cn("empty:hidden", className)}>
      {containerRef ? (
        <CommandCopyButton containerRef={containerRef} />
      ) : (
        children
      )}
    </div>
  );
}

export function CustomPre(props) {
  return (
    <CodeBlock {...props} Actions={CustomActions}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  );
}
