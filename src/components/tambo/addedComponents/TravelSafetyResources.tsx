"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TravelSafetyResourcesProps {
  /** Optional destination to show specific information for */
  destination?: string;
  /** Optional initial section to expand */
  initialSection?: "emergency" | "visa" | "tips" | "contacts";
}

const sections = [
  {
    id: "emergency" as const,
    icon: "🆘",
    title: "Emergency Information",
    content: [
      { label: "International Emergency", value: "112 (works in most countries)" },
      { label: "US Embassy Hotline", value: "+1-888-407-4747 (from US) / +1-202-501-4444 (international)" },
      { label: "WHO Health Emergencies", value: "+41-22-791-2111" },
      { label: "Interpol Emergency", value: "+33-4-7244-7000" },
    ],
  },
  {
    id: "visa" as const,
    icon: "📋",
    title: "Visa Checklist",
    content: [
      { label: "✅ Valid passport", value: "(minimum 6 months validity recommended)" },
      { label: "✅ Visa application form", value: "(check destination embassy website)" },
      { label: "✅ Passport-size photos", value: "(2–4 recent photos, white background)" },
      { label: "✅ Proof of accommodation", value: "(hotel bookings or host letter)" },
      { label: "✅ Proof of funds", value: "(bank statements, last 3 months)" },
      { label: "✅ Return/onward ticket", value: "(confirmed travel itinerary)" },
      { label: "✅ Travel insurance", value: "(with medical coverage)" },
      { label: "✅ Vaccination records", value: "(if required by destination)" },
    ],
  },
  {
    id: "tips" as const,
    icon: "💡",
    title: "Travel Tips",
    content: [
      { label: "💳 Money", value: "Carry a mix of cash and cards; inform your bank of travel plans" },
      { label: "📱 Connectivity", value: "Get a local SIM or international roaming plan before you go" },
      { label: "🏥 Health", value: "Pack a first-aid kit; check required vaccinations 4–6 weeks ahead" },
      { label: "🔒 Security", value: "Use hotel safes for valuables; keep copies of important documents" },
      { label: "🌍 Culture", value: "Research local customs, dress codes, and etiquette" },
      { label: "🚗 Transport", value: "Book airport transfers in advance; use licensed taxis or ride apps" },
      { label: "☀️ Weather", value: "Check seasonal weather and pack accordingly" },
      { label: "📞 Emergency contacts", value: "Save local emergency numbers and your country's embassy contact" },
    ],
  },
  {
    id: "contacts" as const,
    icon: "📞",
    title: "Authority Contacts",
    content: [
      { label: "IATA (Travel)", value: "www.iata.org | +41-22-770-2525" },
      { label: "WHO (Health)", value: "www.who.int | +41-22-791-2111" },
      { label: "INTERPOL (Security)", value: "www.interpol.int | +33-4-7244-7000" },
      { label: "UNWTO (Tourism)", value: "www.unwto.org | +34-91-567-8100" },
      { label: "US Travel Advisory", value: "travel.state.gov | 1-888-407-4747" },
      { label: "UK Travel Advice", value: "gov.uk/foreign-travel-advice | +44-20-7008-5000" },
    ],
  },
];

/**
 * Travel Safety & Resources component for the Tambo chatbot.
 * Shows emergency info, visa checklists, travel tips, and authority contacts.
 */
export function TravelSafetyResources({
  destination,
  initialSection,
}: TravelSafetyResourcesProps) {
  const [openSection, setOpenSection] = React.useState<string | null>(
    initialSection ?? null,
  );

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-xl border border-border bg-background p-4 space-y-2 max-w-sm">
      <div className="flex items-center gap-2 pb-1">
        <span className="text-xl">🛡️</span>
        <div>
          <h3 className="font-semibold text-foreground">Travel Safety &amp; Resources</h3>
          {destination && (
            <p className="text-xs text-muted-foreground">for {destination}</p>
          )}
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="rounded-lg border border-border overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-accent transition-colors"
            onClick={() => toggleSection(section.id)}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span>{section.icon}</span>
              {section.title}
            </span>
            <span
              className={cn(
                "text-muted-foreground transition-transform duration-200 text-xs",
                openSection === section.id ? "rotate-180" : "",
              )}
            >
              ▼
            </span>
          </button>

          {openSection === section.id && (
            <div className="border-t border-border px-3 py-2 space-y-1.5 bg-muted/10">
              {section.content.map((item, index) => (
                <div key={index} className="text-xs">
                  <span className="font-medium text-foreground">{item.label}:</span>{" "}
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <p className="text-xs text-muted-foreground pt-1">
        💡 Always check your government&apos;s official travel advisories before traveling.
      </p>
    </div>
  );
}
