'use client';

import { useState } from 'react';
import { useTamboThreadInput } from '@tambo-ai/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Clock, CreditCard, Compass } from 'lucide-react';

export function TripPlannerSearch() {
  const { setValue, submit } = useTamboThreadInput();
  
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the prompt
    let prompt = `I want to plan a trip`;
    if (destination) prompt += ` to ${destination}`;
    if (duration) prompt += ` for ${duration}`;
    if (budget) prompt += ` with a budget of ${budget}`;
    if (interests) prompt += `. My interests are: ${interests}`;
    prompt += `. Please provide tailored travel suggestions and a cost estimate.`;
    
    // Set the prompt in the Tambo input and submit it
    setValue(prompt);
    setTimeout(() => {
      submit();
      // Dispatch custom event to open the Tambo chat interface
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('openTamboChat'));
      }
    }, 100);
  };

  return (
    <Card className="w-full max-w-sm my-2 overflow-hidden shadow-sm">
      <CardHeader className="bg-muted/30 pb-4 border-b">
        <CardTitle className="text-base">Plan Your Trip</CardTitle>
        <CardDescription>
          Let AI craft the perfect itinerary tailored to your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="e.g., Paris, Japan"
                className="pl-9"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="duration"
                placeholder="e.g., 5 Days, 1 Week"
                className="pl-9"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget (Estimated)</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="budget"
                placeholder="e.g., $2000, 50,000 INR"
                className="pl-9"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests & Preferences</Label>
            <div className="relative">
              <Compass className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="interests"
                placeholder="e.g., History, Food, Beaches"
                className="pl-9"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Plan My Trip with AI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
