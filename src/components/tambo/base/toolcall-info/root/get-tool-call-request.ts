import type { TamboThreadMessage } from "@tambo-ai/react";

/**
 * Get the tool call request from the message
 * @param message - The message to get the tool call request from
 * @returns The tool call request, or undefined if not found
 */
export function getToolCallRequest(
  message: TamboThreadMessage,
): any | undefined {
  return message.toolCallRequest;
}
