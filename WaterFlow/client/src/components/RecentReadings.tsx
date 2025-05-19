import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WaterData } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

interface RecentReadingsProps {
  waterData: WaterData[];
  isLoading: boolean;
}

const RecentReadings: FC<RecentReadingsProps> = ({ waterData, isLoading }) => {
  const calculateTrend = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Get icon based on the location code
  const getLocationIcon = (location?: string) => {
    if (!location) return "fa-tint";

    switch (location) {
      case 'B': return "fa-shower";
      case 'K': return "fa-sink";
      case 'L': return "fa-tshirt";
      case 'O': return "fa-faucet";
      default: return "fa-tint";
    }
  };

  // Get location name for display
  const getLocationName = (location?: string) => {
    if (!location) return "";

    switch (location) {
      case 'B': return "Bathroom";
      case 'K': return "Kitchen";
      case 'L': return "Laundry";
      case 'O': return "Other";
      default: return "";
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-heading font-semibold text-neutral-dark">Recent Readings</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {isLoading && waterData.length === 0 ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg">
                <div className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="ml-3">
                    <Skeleton className="w-24 h-4 mb-2" />
                    <Skeleton className="w-16 h-3" />
                  </div>
                </div>
                <Skeleton className="w-12 h-5" />
              </div>
            ))
          ) : (
            waterData.map((reading, index) => {
              const previousValue = index < waterData.length - 1 ? waterData[index + 1].value : null;
              const trend = previousValue !== null && reading.value !== null 
                ? calculateTrend(reading.value, previousValue) 
                : 0;
              const trendDirection = trend < 0 ? 'down' : 'up';
              const trendClass = trend < 0 ? 'text-success' : 'text-danger';
              const locationIcon = getLocationIcon(reading.location);
              const locationName = getLocationName(reading.location);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-light/50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center mr-3">
                      <i className={`fas ${locationIcon} text-primary`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-dark">
                        {reading.value !== null ? reading.value.toFixed(1) : "0.0"} liters
                        {locationName && <span className="ml-1 text-xs text-neutral-dark/60">({locationName})</span>}
                      </div>
                      <div className="text-xs text-neutral-dark/60">
                        {new Date(reading.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  {previousValue !== null && (
                    <div className={trendClass + " font-medium"}>
                      <i className={`fas fa-arrow-${trendDirection} mr-1`}></i>
                      {Math.abs(trend).toFixed(1)}%
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReadings;
