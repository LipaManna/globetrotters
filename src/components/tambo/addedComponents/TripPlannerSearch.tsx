'use client';

import { useState } from 'react';
import { useTamboThreadInput } from '@tambo-ai/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className="banFormSec" style={{ marginBottom: '40px' }}>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group pb-2">
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{ borderRadius: '30px', height: '50px' }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group pb-2">
                <Input
                  type="text"
                  placeholder="Duration (e.g., 5 Days)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{ borderRadius: '30px', height: '50px' }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group pb-2">
                <Input
                  type="text"
                  placeholder="Budget (e.g., $2000)"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ borderRadius: '30px', height: '50px' }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group pb-2">
                <Input
                  type="text"
                  placeholder="Interests (e.g., history, food)"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  style={{ borderRadius: '30px', height: '50px' }}
                />
              </div>
            </div>
          </div>
          <div className="formBtn" style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button 
              type="submit" 
              style={{ borderRadius: '30px', padding: '0 40px', height: '50px', background: '#ff7c30' }}
            >
              Plan My Trip with AI
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
