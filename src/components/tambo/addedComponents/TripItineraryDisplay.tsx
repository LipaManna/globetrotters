import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Clock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface CostItem {
  category: string;
  amount: number;
}

export interface TripItineraryDisplayProps {
  destination: string;
  duration: string;
  totalCost: number;
  currency: string;
  costBreakdown: CostItem[];
  itinerary: ItineraryDay[];
  tips: string[];
}

export function TripItineraryDisplay({
  destination,
  duration,
  totalCost,
  currency,
  costBreakdown,
  itinerary,
  tips
}: TripItineraryDisplayProps) {
  // Safe fallbacks to prevent rendering errors while Tambo streams JSON
  const safeItinerary = itinerary || [];
  const safeCostBreakdown = costBreakdown || [];
  const safeTips = tips || [];

  return (
    <div className="w-full space-y-4 my-2 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header Summary Card */}
      <Card className="overflow-hidden shadow-sm border-primary/20">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white text-center">
          <h2 className="text-xl font-bold mb-2 text-white text-balance">Trip to {destination || '...'}</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm font-medium text-white/90">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration || '...'}</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span className="whitespace-nowrap">{currency} {totalCost?.toLocaleString() || '...'}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4 flex flex-col">
        {/* Cost Breakdown */}
        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4 outline outline-1 outline-border bg-muted/10">
            <CardTitle className="text-sm">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              {safeCostBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-start gap-4 text-sm">
                  <span className="text-muted-foreground">{item.category}</span>
                  <span className="font-medium shrink-0 whitespace-nowrap">{currency} {item.amount?.toLocaleString()}</span>
                </div>
              ))}
              {safeCostBreakdown.length > 0 && (
                <div className="pt-2 mt-2 border-t border-border flex justify-between items-start gap-4 font-bold text-sm">
                  <span>Total</span>
                  <span className="text-primary font-bold shrink-0 whitespace-nowrap">{currency} {totalCost?.toLocaleString()}</span>
                </div>
              )}
              {safeCostBreakdown.length === 0 && (
                <div className="text-center text-xs text-muted-foreground">
                  Calculating estimated costs...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Itinerary */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-primary px-1">
            <MapPin className="w-4 h-4" />
            Day-by-Day Itinerary
          </h3>
          
          <div className="space-y-3 pl-2 border-l-2 border-primary/30 ml-2">
            {safeItinerary.map((dayItem, index) => (
              <div key={index} className="relative pl-6 pb-2">
                {/* Timeline Dot */}
                <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full bg-white border-4 border-primary"></div>
                
                <Card className="overflow-hidden shadow-sm">
                  <div className="py-2 px-3 bg-muted/30 border-b flex flex-col sm:flex-row gap-2 sm:items-center">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full w-fit shrink-0 whitespace-nowrap">
                      Day {dayItem.day}
                    </span>
                    <span className="text-sm font-semibold">{dayItem.title}</span>
                  </div>
                  <div className="p-3">
                    <ul className="space-y-1.5">
                      {dayItem.activities?.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start gap-2 text-xs text-foreground/80">
                          <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary/60 shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
            
            {safeItinerary.length === 0 && (
              <div className="p-3 text-center text-xs text-muted-foreground border border-dashed rounded bg-background/50 ml-4">
                Crafting your tailored itinerary...
              </div>
            )}
          </div>
        </div>

        {/* Travel Tips */}
        {safeTips.length > 0 && (
          <Card className="shadow-sm border-blue-100 bg-blue-50/30">
            <CardHeader className="py-2 px-3">
              <CardTitle className="text-xs font-bold text-blue-800">Travel Info & Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ul className="space-y-1.5">
                {safeTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-blue-900/80">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-400 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
