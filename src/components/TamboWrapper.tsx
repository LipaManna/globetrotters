import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadCollapsible } from "./tambo/message-thread-collapsible";
import { components, tools, contextHelpers } from "@/lib/tambo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TamboWrapperProps {
  children: React.ReactNode;
}

const GUEST_USER_KEY = "tambo_guest_user_key";

function getOrCreateGuestUserKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem(GUEST_USER_KEY);
  if (!key) {
    key = `guest_${crypto.randomUUID()}`;
    localStorage.setItem(GUEST_USER_KEY, key);
  }
  return key;
}

export default function TamboWrapper({ children }: TamboWrapperProps) {
  const router = useRouter();
  const [userKey] = useState<string>(getOrCreateGuestUserKey);

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
      userKey={userKey}
      components={components}
      tools={tools}
      contextHelpers={contextHelpers}
    >
      {children}
      <MessageThreadCollapsible className="z-50" />
    </TamboProvider>
  );
}
