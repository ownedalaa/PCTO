import { FC, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWaterData } from '@/hooks/useWaterData';

const UsageBreakdown: FC = () => {
  const { waterData, isLoading } = useWaterData();

  // Group the water data by location and calculate total usage per location
  const locationTotals = useMemo(() => {
    // Initialize counters for each location
    const totals = {
      B: 0, // Bathroom
      K: 0, // Kitchen
      L: 0, // Laundry
      O: 0  // Other
    };
    
    // Count total readings for each location
    let readingsWithLocation = 0;
    
    // Process the data to sum up values by location
    waterData.forEach(reading => {
      if (reading.location) {
        totals[reading.location as keyof typeof totals] += reading.value;
        readingsWithLocation++;
      } else {
        // For data without location, distribute according to typical usage
        totals.B += reading.value * 0.42; // 42% bathroom
        totals.K += reading.value * 0.28; // 28% kitchen
        totals.L += reading.value * 0.19; // 19% laundry
        totals.O += reading.value * 0.11; // 11% other
      }
    });
    
    return totals;
  }, [waterData]);

  // Calculate total and percentages
  const total = locationTotals.B + locationTotals.K + locationTotals.L + locationTotals.O;
  
  // Calculate percentages (default to typical distribution if no data)
  const bathroomPercent = total > 0 ? Math.round((locationTotals.B / total) * 100) : 42;
  const kitchenPercent = total > 0 ? Math.round((locationTotals.K / total) * 100) : 28;
  const laundryPercent = total > 0 ? Math.round((locationTotals.L / total) * 100) : 19;
  const otherPercent = total > 0 ? Math.round((locationTotals.O / total) * 100) : 11;

  // Calculate fill levels for the water visualization (capped at 75% for aesthetics)
  const bathroomFill = `${Math.min(bathroomPercent * 0.75, 75)}%`;
  const kitchenFill = `${Math.min(kitchenPercent * 0.75, 75)}%`;
  const laundryFill = `${Math.min(laundryPercent * 0.75, 75)}%`;
  const otherFill = `${Math.min(otherPercent * 0.75, 75)}%`;

  return (
    <Card className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
      <CardHeader className="px-0 pt-0 pb-6">
        <CardTitle className="text-xl font-heading font-semibold text-neutral-dark">Water Usage Breakdown</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Bathroom usage */}
          <div className="relative water-fill" style={{ '--fill-level': bathroomFill } as React.CSSProperties}>
            <div className="p-4 text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-shower text-primary-dark text-xl"></i>
              </div>
              <h3 className="font-medium text-neutral-dark">Bathroom</h3>
              <p className="text-2xl font-mono text-white font-medium mt-1 mb-8">
                {bathroomPercent}%
              </p>
            </div>
            <div className="water-wave"></div>
          </div>
          
          {/* Kitchen usage */}
          <div className="relative water-fill" style={{ '--fill-level': kitchenFill } as React.CSSProperties}>
            <div className="p-4 text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-sink text-primary-dark text-xl"></i>
              </div>
              <h3 className="font-medium text-neutral-dark">Kitchen</h3>
              <p className="text-2xl font-mono text-white font-medium mt-1 mb-8">
                {kitchenPercent}%
              </p>
            </div>
            <div className="water-wave"></div>
          </div>
          
          {/* Laundry usage */}
          <div className="relative water-fill" style={{ '--fill-level': laundryFill } as React.CSSProperties}>
            <div className="p-4 text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-tshirt text-primary-dark text-xl"></i>
              </div>
              <h3 className="font-medium text-neutral-dark">Laundry</h3>
              <p className="text-2xl font-mono text-white font-medium mt-1 mb-8">
                {laundryPercent}%
              </p>
            </div>
            <div className="water-wave"></div>
          </div>
          
          {/* Other usage */}
          <div className="relative water-fill" style={{ '--fill-level': otherFill } as React.CSSProperties}>
            <div className="p-4 text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-md flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-faucet text-primary-dark text-xl"></i>
              </div>
              <h3 className="font-medium text-neutral-dark">Other</h3>
              <p className="text-2xl font-mono text-white font-medium mt-1 mb-8">
                {otherPercent}%
              </p>
            </div>
            <div className="water-wave"></div>
          </div>
        </div>

        {/* Information about actual values */}
        {total > 0 && (
          <div className="mt-6 p-4 bg-neutral-light/50 rounded-lg">
            <h3 className="font-medium text-neutral-dark mb-3">Actual Usage Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-neutral-dark/70">Bathroom</p>
                <p className="text-lg font-medium text-primary-dark">{locationTotals.B.toFixed(1)} L</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Kitchen</p>
                <p className="text-lg font-medium text-primary-dark">{locationTotals.K.toFixed(1)} L</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Laundry</p>
                <p className="text-lg font-medium text-primary-dark">{locationTotals.L.toFixed(1)} L</p>
              </div>
              <div>
                <p className="text-sm text-neutral-dark/70">Other</p>
                <p className="text-lg font-medium text-primary-dark">{locationTotals.O.toFixed(1)} L</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsageBreakdown;
