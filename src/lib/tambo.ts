import { RegistrationForm } from "@/components/tambo/addedComponents/RegistrationForm";
import { ChatPackageList } from "@/components/tambo/addedComponents/ChatPackageList";
import { ChatPackageCard } from "@/components/tambo/addedComponents/ChatPackageCard";
import { LocationPermissionCard } from "@/components/tambo/addedComponents/LocationPermissionCard";
import { SmartRecommendations } from "@/components/tambo/addedComponents/SmartRecommendations";
import { PackageCustomizer } from "@/components/tambo/addedComponents/PackageCustomizer";
import { ContactDetails } from "@/components/tambo/addedComponents/ContactDetails";
import { TripPlannerSearch } from "@/components/tambo/addedComponents/TripPlannerSearch";
import { TripItineraryDisplay } from "@/components/tambo/addedComponents/TripItineraryDisplay";
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
    description: "A trip planning form that allows users to specify destination, duration, budget, and interests to get AI travel suggestions. Show this when a user asks to plan a trip or needs to input complex search criteria. WHEN RESPONDING TO A TRIP PLAN REQUEST: 1. FIRST, intelligently use the `search_packages` tool by passing the requested destination into the `query` parameter to check if existing pre-made packages match the criteria. Check if the returned package price and duration align with the user request. If a match is found based on price and duration, strongly recommend it. 2. If no existing packages match or the user wants a custom trip, evaluate feasibility. If the budget/duration is completely unrealistic (e.g., 10000 INR for 10 days in Europe), DO NOT plan a trip. Politely explain why it's not feasible and cite general estimated costs. 3. If feasible, generate the tailored itinerary using the `TripItineraryDisplay` component.",
    component: TripPlannerSearch,
    propsSchema: z.object({}),
  },
  {
    name: "TripItineraryDisplay",
    description: "CRITICAL INSTRUCTION: You MUST use this `TripItineraryDisplay` component to show the final tailored travel results, itinerary, and cost estimate. REQUIRED: Keep all text EXTREMELY CONCISE. Use very short bullet points (1-2 sentences max) for activities and tips. DO NOT write long paragraphs. Populate the component's props with a detailed, creative day-by-day itinerary, accurate cost breakdown, and helpful travel tips. Use this WHENEVER providing a custom trip plan.",
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
