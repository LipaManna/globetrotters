import { RegistrationForm } from "@/components/tambo/addedComponents/RegistrationForm";
import { ChatPackageList } from "@/components/tambo/addedComponents/ChatPackageList";
import { ChatPackageCard } from "@/components/tambo/addedComponents/ChatPackageCard";
import { LocationPermissionCard } from "@/components/tambo/addedComponents/LocationPermissionCard";
import { SmartRecommendations } from "@/components/tambo/addedComponents/SmartRecommendations";
import { PackageCustomizer } from "@/components/tambo/addedComponents/PackageCustomizer";
import { ContactDetails } from "@/components/tambo/addedComponents/ContactDetails";
import { TripPlannerSearch } from "@/components/tambo/addedComponents/TripPlannerSearch";
import { TripItineraryDisplay } from "@/components/tambo/addedComponents/TripItineraryDisplay";
import { TravelSafetyResources } from "@/components/tambo/addedComponents/TravelSafetyResources";
import { NavigationTool } from "@/components/tambo/tools/NavigationTool";
import { z } from "zod";
import { TamboTool } from "@tambo-ai/react";
import { getContactSchema, getContactAction } from "@/components/tambo/tools/GetContact";
import { navigateSchema, navigateToolAction } from "@/components/tambo/tools/Navigate";
import { getCurrentPageSchema, getCurrentPageAction } from "@/components/tambo/tools/GetCurrentPage";
import { searchPackagesSchema, searchPackagesAction } from "@/components/tambo/tools/SearchTool";
import { getDateTimeSchema, getDateTimeAction } from "@/components/tambo/tools/GetDateTime";
import { getLocationSchema, getLocationAction } from "@/components/tambo/tools/GetLocation";

export const components = [
  {
    name: "ContactDetails",
    description: "Show this immediately whenever a user asks for contact details, phone number, email, or who to talk to. This shows the details for Subhajit.",
    component: ContactDetails,
    propsSchema: z.object({
      fullName: z.string().optional().describe("The name of the contact person"),
      phone: z.string().optional().describe("The phone number"),
      email: z.string().optional().describe("The email address"),
    }),
  },
  {
    name: "RegistrationForm",
    description: "ESSENTIAL: Show this form immediately whenever a user says they want to book, register interest, or inquire about a package. DO NOT just ask for details in text; show this form.",
    component: RegistrationForm,
    propsSchema: z.object({
      packageId: z.string().optional().describe("The ID of the package"),
      packageTitle: z.string().optional().describe("The title of the package"),
    }),
  },
  {
    name: "PackageCustomizer",
    description: "Show this specifically when a user asks to CUSTOMIZE, change, or modify a package. This is a rich interactive tool for personalization.",
    component: PackageCustomizer,
    propsSchema: z.object({
      packageId: z.string().optional().describe("The ID of the package to customize. If not provided, the component will attempt to detect it or ask the user."),
    }),
  },
  {
    name: "NavigateToPage",
    description: "Navigate the user to a specific page or route in the application.",
    component: NavigationTool,
    propsSchema: z.object({
      path: z.string().optional().nullable().describe("The path to navigate to. Use the 'url' field from search results (e.g., '/package/123')."),
    }),
  },
  {
    name: "ChatPackageList",
    description: "Display a list of available holiday packages directly in the chat. Use the `query` parameter to show packages matching a specific destination or keyword! (e.g. { query: 'Europe' })",
    component: ChatPackageList,
    propsSchema: z.object({
      limit: z.number().optional().describe("Number of packages to display (default: 5)"),
      category: z.enum(['domestic', 'international', 'all']).optional().describe("Filter by category (default: all)"),
      query: z.string().optional().describe("Search keywords, destination name, or tags to filter packages by."),
    }),
  },
  {
    name: "ChatPackageCard",
    description: "Display rich details for a single package. Use ONLY when the user asks for details about a specific package from search results. DO NOT USE if the user is already on the individual package page unless they explicitly ask for a search-result style card.",
    component: ChatPackageCard,
    propsSchema: z.object({
      id: z.string().optional().describe("The unique ID of the package to display. Required for showing details."),
    }),
  },
  {
    name: "LocationPermissionCard",
    description: "UI to request location permission from the user. Use this if 'get_location' tool returns 'prompt_required'.",
    component: LocationPermissionCard,
    propsSchema: z.object({}),
  },
  {
    name: "SmartRecommendations",
    description: "A premium dashboard showing personalized recommendations based on time, page context, and location.",
    component: SmartRecommendations,
    propsSchema: z.object({
      locationStatus: z.enum(['granted', 'prompt_required', 'denied']).optional(),
      currentPath: z.string().optional(),
      timeContext: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional()
    }),
  },
  {
    name: "TripPlannerSearch",
    description: "Form for destination, duration, and budget. PERSONALITY: You are a travel-only assistant. Redirect non-travel topics (like medical issues) to travel with a pun (e.g., 'Sounds like you need the Maldives for Vitamin D!'). TO PLAN A TRIP: 1. Use `search_packages`. 2. Check feasibility. 3. If feasible, use `TripItineraryDisplay`.",
    component: TripPlannerSearch,
    propsSchema: z.object({}),
  },
  {
    name: "TripItineraryDisplay",
    description: "Show final tailored itinerary. Keep text extremely concise (short bullets). Stay witty and travel-focused.",
    component: TripItineraryDisplay,
    propsSchema: z.object({
      destination: z.string().describe("The destination name (e.g., 'Paris, France')"),
      duration: z.string().describe("The length of the trip (e.g., '5 Days, 4 Nights')"),
      totalCost: z.number().describe("The total estimated cost amount"),
      currency: z.string().describe("The currency symbol or code (e.g., '$', 'INR', '€')"),
      costBreakdown: z.array(
        z.object({
          category: z.string().describe("Cost category (e.g., 'Flights', 'Accommodation', 'Food')"),
          amount: z.number().describe("Estimated amount for this category")
        })
      ).describe("Breakdown of the total cost into categories"),
      itinerary: z.array(
        z.object({
          day: z.number().describe("The day number (e.g., 1, 2)"),
          title: z.string().describe("A short title for the day (e.g., 'Arrival & City Tour')"),
          activities: z.array(z.string()).describe("A list of activities for this day")
        })
      ).describe("The day-by-day itinerary"),
      tips: z.array(z.string()).describe("A list of helpful travel tips, packing advice, or local customs")
    }),
  },
  {
    name: "TravelSafetyResources",
    description: "REQUIRED: You MUST use this component WHENEVER a user asks about safety, visas, emergency info, or travel tips for a destination. Do not just type the answer; trigger this component. Keep props concise.",
    component: TravelSafetyResources,
    propsSchema: z.object({
      destination: z.string().describe("The destination name"),
      emergencyNumbers: z.array(z.object({
        service: z.string().describe("Service name (Police, Ambulance)"),
        number: z.string().describe("Phone number")
      })).optional(),
      visaStatus: z.string().optional().describe("Short visa status (e.g., 'Visa Free', 'E-Visa Required')"),
      quickTips: z.array(z.string()).optional().describe("Max 3 short travel tips")
    }),
  },
];

export const tools: TamboTool[] = [
  {
    name: "search_packages",
    description: "Search for packages. Supports filtering by keywords (query) and category (domestic/international). Returns unique 'id' for each package.",
    tool: searchPackagesAction,
    inputSchema: searchPackagesSchema,
    outputSchema: z.array(z.object({
      id: z.string(),
      title: z.string(),
      location: z.string(),
      duration: z.string().optional(),
      price: z.number(),
      url: z.string()
    })),
  },
  {
    name: "navigate",
    description: "Silent navigation to a specific route.",
    tool: navigateToolAction,
    inputSchema: navigateSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_contact",
    description: "Get the contact details for Subhajit (phone and email). Use this when the user asks for contact info.",
    tool: getContactAction,
    inputSchema: getContactSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_current_page",
    description: "Retrieves the current URL path. ESSENTIAL for providing relevant suggestions or help based on what the user is currently viewing (e.g., if they are on a package page).",
    tool: getCurrentPageAction,
    inputSchema: getCurrentPageSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_date_time",
    description: "Get the current date/time context. Use this to provide timely suggestions, relevant season-based travel advice, or check for current offers.",
    tool: getDateTimeAction,
    inputSchema: getDateTimeSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_location",
    description: "Check for user location. If it returns 'prompt_required', you MUST render the 'LocationPermissionCard' component to ask the user.",
    tool: getLocationAction,
    inputSchema: getLocationSchema,
    outputSchema: z.any(),
  },
];
