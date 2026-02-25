"use client";

import { cn } from "@/lib/utils";
import { useTambo } from "@tambo-ai/react";
import { Loader2Icon } from "lucide-react";
import * as React from "react";

/**
 * Represents the generation stage of a message
 * @property {string} className - Optional className for custom styling
 * @property {boolean} showLabel - Whether to show the label
 */

export interface GenerationStageProps extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean;
}

export function MessageGenerationStage({
  className,
  showLabel = true,
  ...props
}: GenerationStageProps) {
  const { generationStage, isIdle } = useTambo();
  const stage = generationStage;

  // Only render if we have a generation stage and not idle
  if (!stage || isIdle) {
    return null;
  }

  // Map stage names to more user-friendly labels
  const stageLabels: Record<string, string> = {
    IDLE: "Idle",
    FETCHING_CONTEXT: "Preparing response",
    STREAMING_RESPONSE: "Generating response",
    CHOOSING_COMPONENT: "Choosing component",
    HYDRATING_COMPONENT: "Rendering component",
  };

  const label =
    stageLabels[stage] || stage.charAt(0).toUpperCase() + stage.slice(1);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-1 text-xs rounded-md bg-transparent text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Loader2Icon className="h-3 w-3 animate-spin" />
      {showLabel && <span>{label}</span>}
    </div>
  );
}
