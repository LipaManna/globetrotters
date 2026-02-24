/**
 * Returns tool parameters as a key-value record.
 * In the new API, parameters are already in Record format.
 * @param parameters - Tool parameters as a Record
 * @returns The same record, or undefined if not provided
 */
export function keyifyParameters(
  parameters: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  return parameters;
}
