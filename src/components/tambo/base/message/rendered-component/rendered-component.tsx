import { Slot } from "@radix-ui/react-slot";
import type { TamboComponentContent } from "@tambo-ai/react";
import * as React from "react";
import { useMessageRootContext } from "../root/message-root-context";

function getRenderedComponent(message: { content?: unknown[] }) {
  if (!Array.isArray(message.content)) return undefined;
  const componentBlock = message.content.find(
    (c): c is TamboComponentContent => (c as TamboComponentContent)?.type === "component",
  );
  return componentBlock?.renderedComponent;
}

export interface MessageRenderedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, renders as a Slot, merging props into the child element. */
  asChild?: boolean;
}

/**
 * RenderedComponent base for displaying AI-generated components.
 * Only renders for assistant messages with a renderedComponent.
 */
export const MessageRenderedComponent = React.forwardRef<
  HTMLDivElement,
  MessageRenderedComponentProps
>(({ asChild, children, ...props }, ref) => {
  const { message, role } = useMessageRootContext();
  const renderedComponent = getRenderedComponent(message);

  if (!renderedComponent || role !== "assistant") {
    return null;
  }

  const Comp = asChild ? Slot : "div";

  return (
    <Comp ref={ref} data-slot="message-rendered-component-area" {...props}>
      {children}
    </Comp>
  );
});
MessageRenderedComponent.displayName = "Message.RenderedComponent";
