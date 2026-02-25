import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Lightbulb, Phone, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmergencyContact {
  service: string;
  number: string;
}

export interface TravelSafetyResourcesProps {
  destination: string;
  emergencyNumbers?: EmergencyContact[];
  visaStatus?: string;
  quickTips?: string[];
}

export function TravelSafetyResources({
  destination,
  emergencyNumbers,
  visaStatus,
  quickTips
}: TravelSafetyResourcesProps) {
  // Safeguard against null values from LLM/Tambo
  const safeEmergencyNumbers = Array.isArray(emergencyNumbers) ? emergencyNumbers : [];
  const safeTips = Array.isArray(quickTips) ? quickTips : [];

  return (
    <div className="w-full space-y-4 my-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Premium Header - Tightened Gap */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg shrink-0">
            <ShieldAlert className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-bold text-foreground tracking-tight leading-none">Travel Safety & Resources</h2>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest leading-none">{destination}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-1">
        {/* Quick Info Row */}
        <div className="flex gap-3">
          {visaStatus && (
            <Card className="flex-1 shadow-sm border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
              <CardContent className="p-3 relative">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Info className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-tight">Visa Requirement</span>
                </div>
                <p className="text-sm font-bold text-foreground leading-tight">{visaStatus}</p>
                <div className="absolute -right-3 -bottom-3 opacity-5">
                   <ShieldAlert className="w-16 h-16 text-primary" />
                </div>
              </CardContent>
            </Card>
          )}

          {safeEmergencyNumbers.length > 0 && (
            <Card className="flex-1 shadow-sm border-destructive/20 bg-destructive/5 overflow-hidden">
              <CardContent className="p-3 relative">
                <div className="flex items-center gap-1.5 mb-1.5 text-destructive">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold uppercase tracking-tight">Emergency</span>
                </div>
                <div className="space-y-1.5">
                  {safeEmergencyNumbers.slice(0, 2).map((c, i) => (
                    <div key={i} className="flex justify-between items-center gap-2">
                      <span className="text-xs text-muted-foreground font-medium truncate flex-1">{c.service}</span>
                      <span className="text-sm font-black text-destructive tabular-nums shrink-0 whitespace-nowrap">{c.number}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Expert Advice Section */}
        {safeTips.length > 0 && (
          <Card className="shadow-sm border-amber-200/60 bg-amber-50/20 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300 tracking-tight">Essential Travel Guidelines</span>
              </div>
              <div className="space-y-3">
                {safeTips.slice(0, 3).map((tip, idx) => (
                  <div key={idx} className="flex gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-amber-900/30 border border-amber-200/50 flex items-center justify-center text-xs font-bold text-amber-600 shadow-sm">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors pt-0.5">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
