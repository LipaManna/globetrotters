import type { TamboComponentContent } from "@tambo-ai/react";
import * as React from "react";
import { useMessageRootContext } from "../root/message-root-context";

export type MessageRenderedComponentCanvasButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

function getRenderedComponent(message: { content?: unknown[] }) {
  if (!Array.isArray(message.content)) return undefined;
  const componentBlock = message.content.find(
    (c): c is TamboComponentContent => (c as TamboComponentContent)?.type === "component",
  );
  return componentBlock?.renderedComponent;
}

export const MessageRenderedComponentCanvasButton = React.forwardRef<
  HTMLButtonElement,
  MessageRenderedComponentCanvasButtonProps
>(({ children, ...props }, ref) => {
  const { message } = useMessageRootContext();
  const renderedComponent = getRenderedComponent(message);
  const [canvasExists, setCanvasExists] = React.useState(false);

  // Check if canvas exists on mount and window resize
  React.useEffect(() => {
    const checkCanvasExists = () => {
      const canvas = document.querySelector('[data-canvas-space="true"]');
      setCanvasExists(!!canvas);
    };

    checkCanvasExists();
    window.addEventListener("resize", checkCanvasExists);
    return () => window.removeEventListener("resize", checkCanvasExists);
  }, []);

  const onShowInCanvas = React.useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("tambo:showComponent", {
          detail: {
            messageId: message.id,
            component: renderedComponent,
          },
        }),
      );
    }
  }, [message.id, renderedComponent]);

  if (!canvasExists) return null;

  return (
    <button
      ref={ref}
      onClick={onShowInCanvas}
      data-slot="rendered-component-canvas-button"
      {...props}
    >
      {children}
    </button>
  );
});
MessageRenderedComponentCanvasButton.displayName =
  "Message.RenderedComponentCanvasButton";
