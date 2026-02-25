import * as React from "react";
import { useMessageRootContext } from "../root/message-root-context";

function getRenderedComponent(message: { content?: unknown[] }) {
  if (!Array.isArray(message.content)) return undefined;
  const componentBlock = message.content.find(
    (c: any) => c?.type === "component",
  ) as any;
  return componentBlock?.renderedComponent;
}

export const MessageRenderedComponentContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { message } = useMessageRootContext();
  const renderedComponent = getRenderedComponent(message);

  if (!renderedComponent) {
    return null;
  }

  return (
    <div ref={ref} data-slot="message-rendered-component-content" {...props}>
      {renderedComponent}
    </div>
  );
});
MessageRenderedComponentContent.displayName =
  "Message.RenderedComponentContent";
