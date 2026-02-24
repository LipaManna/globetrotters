import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadCollapsible } from "./tambo/message-thread-collapsible";
import { components, tools, contextHelpers } from "@/lib/tambo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface TamboWrapperProps {
  children: React.ReactNode;
}

export default function TamboWrapper({ children }: TamboWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = (event: any) => {
      const { path } = event.detail;
      if (path) {
        router.push(path);
      }
    };

    window.addEventListener("tambo:navigate", handleNavigation);
    return () => window.removeEventListener("tambo:navigate", handleNavigation);
  }, [router]);

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      contextHelpers={contextHelpers}
    >
      {children}
      <MessageThreadCollapsible className="z-50" />
    </TamboProvider>
  );
}
