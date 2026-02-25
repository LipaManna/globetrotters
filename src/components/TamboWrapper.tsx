import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadCollapsible } from "./tambo/message-thread-collapsible";
import { components, tools } from "@/lib/tambo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TamboWrapperProps {
  children: React.ReactNode;
}

export default function TamboWrapper({ children }: TamboWrapperProps) {
  const router = useRouter();
  const [userKey, setUserKey] = useState<string>("");

  useEffect(() => {
    // Generate or load a persistent user session ID for Tambo
    let key = localStorage.getItem("tambo-user-key");
    if (!key) {
      key = uuidv4();
      localStorage.setItem("tambo-user-key", key);
    }
    setUserKey(key);
  }, []);

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
      userKey={userKey || "anonymous"}
    >
      {children}
      <MessageThreadCollapsible className="z-50" />
    </TamboProvider>
  );
}
