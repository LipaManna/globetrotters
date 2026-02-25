import type { TamboThreadMessage, TamboToolUseContent } from "@tambo-ai/react";

/**
 * Get the tool use content block from the message content array
 * @param message - The message to get the tool use content from
 * @returns The tool use content block, or undefined if not found
 */
export function getToolCallRequest(
  message: TamboThreadMessage,
): TamboToolUseContent | undefined {
  if (!Array.isArray(message.content)) return undefined;
  return message.content.find(
    (c): c is TamboToolUseContent => c.type === "tool_use",
  );
}
