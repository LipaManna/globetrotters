"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TripPlannerProps {
  /** Optional initial destination hint */
  destinationHint?: string;
}

/**
 * Trip Planner / Cost Estimator component for the Tambo chatbot.
 * Allows users to input travel dates, budget, and interests to receive tailored suggestions.
 */
export function TripPlanner({ destinationHint }: TripPlannerProps) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [interests, setInterests] = React.useState<string[]>([]);
  const [submitted, setSubmitted] = React.useState(false);

  const interestOptions = [
    "Adventure",
    "Beach",
    "Culture",
    "Food & Cuisine",
    "History",
    "Nature",
    "Relaxation",
    "Shopping",
    "Wildlife",
  ];

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-background p-4 space-y-3 max-w-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">✈️</span>
          <h3 className="font-semibold text-foreground">Trip Details Received!</h3>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          {startDate && endDate && (
            <p>
              <span className="font-medium text-foreground">Dates:</span>{" "}
              {startDate} → {endDate}
            </p>
          )}
          {budget && (
            <p>
              <span className="font-medium text-foreground">Budget:</span> {budget}
            </p>
          )}
          {interests.length > 0 && (
            <p>
              <span className="font-medium text-foreground">Interests:</span>{" "}
              {interests.join(", ")}
            </p>
          )}
          {destinationHint && (
            <p>
              <span className="font-medium text-foreground">Destination:</span>{" "}
              {destinationHint}
            </p>
          )}
        </div>
        <p className="text-sm text-primary font-medium">
          I&apos;m finding the best travel suggestions for you! 🌍
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 space-y-4 max-w-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">🗺️</span>
        <h3 className="font-semibold text-foreground">Plan Your Trip</h3>
      </div>
      {destinationHint && (
        <p className="text-sm text-muted-foreground">
          Destination: <span className="font-medium text-foreground">{destinationHint}</span>
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Departure Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Return Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Budget (per person)
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select budget range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 – $1,000">$500 – $1,000</option>
            <option value="$1,000 – $2,500">$1,000 – $2,500</option>
            <option value="$2,500 – $5,000">$2,500 – $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Interests (select all that apply)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs border transition-colors",
                  interests.includes(interest)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:bg-accent",
                )}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!startDate || !endDate || !budget || interests.length === 0}
        >
          Find Travel Suggestions ✈️
        </button>
        {(!startDate || !endDate || !budget || interests.length === 0) && (
          <p className="text-xs text-muted-foreground text-center">
            Please fill in dates, budget, and at least one interest
          </p>
        )}
      </form>
    </div>
  );
}
