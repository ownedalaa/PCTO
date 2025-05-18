import { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  currentUsage: number | null;
  dailyAverage: number | null;
  usageTrend: number | null;
  waterEfficiency: number | null;
  isLoading: boolean;
}

const StatsCards: FC<StatsCardsProps> = ({ 
  currentUsage,
  dailyAverage,
  usageTrend,
  waterEfficiency,
  isLoading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Current Usage Card */}
      <Card className="bg-white rounded-xl shadow-md overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="relative z-10">
            <h2 className="text-sm uppercase tracking-wider text-neutral-dark/60 font-medium">Current Usage</h2>
            <div className="flex items-end mt-2 mb-1">
              <span className={`text-4xl font-mono font-medium text-primary-dark ${isLoading ? 'animate-pulse' : ''}`}>
                {currentUsage !== null ? currentUsage.toFixed(1) : '—'}
              </span>
              <span className="ml-2 text-sm text-neutral-dark/70 pb-1">liters</span>
            </div>
            
            <div className="flex items-center mt-4">
              {usageTrend !== null && (
                <div className={`flex items-center ${usageTrend < 0 ? 'text-success' : 'text-danger'}`}>
                  <i className={`fas fa-arrow-${usageTrend < 0 ? 'down' : 'up'} mr-1 text-xs`}></i>
                  <span className="text-sm font-medium">{Math.abs(usageTrend).toFixed(1)}%</span>
                </div>
              )}
              <span className="text-xs text-neutral-dark/60 ml-2">vs. previous reading</span>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light to-primary"></div>
        </CardContent>
      </Card>
      
      {/* Daily Average Card */}
      <Card className="bg-white rounded-xl shadow-md overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="relative z-10">
            <h2 className="text-sm uppercase tracking-wider text-neutral-dark/60 font-medium">Daily Average</h2>
            <div className="flex items-end mt-2 mb-1">
              <span className={`text-4xl font-mono font-medium text-primary-dark ${isLoading ? 'animate-pulse' : ''}`}>
                {dailyAverage !== null ? dailyAverage.toFixed(1) : '—'}
              </span>
              <span className="ml-2 text-sm text-neutral-dark/70 pb-1">liters</span>
            </div>
            
            <div className="water-fill h-2 w-full rounded-full bg-neutral-light mt-4 overflow-hidden">
              <div className="h-full bg-primary-light rounded-full transition-all duration-1000 ease-in-out" 
                   style={{ width: dailyAverage ? `${Math.min((dailyAverage / 200) * 100, 100)}%` : '0%' }}>
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-neutral-dark/60">Goal: 100L</span>
              <span className="text-xs text-neutral-dark/60">200L</span>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light to-primary"></div>
        </CardContent>
      </Card>
      
      {/* Water Efficiency Card */}
      <Card className="bg-white rounded-xl shadow-md overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="relative z-10">
            <h2 className="text-sm uppercase tracking-wider text-neutral-dark/60 font-medium">Water Efficiency</h2>
            <div className="flex items-center mt-2 mb-1">
              <span className="water-drop text-4xl mr-2 text-primary-light">
                <i className="fas fa-droplet"></i>
              </span>
              <div>
                <div className={`text-2xl font-mono font-medium ${waterEfficiency && waterEfficiency < 0 ? 'text-success' : 'text-danger'}`}>
                  {waterEfficiency !== null ? `${waterEfficiency > 0 ? '+' : ''}${waterEfficiency.toFixed(1)}%` : '—'}
                </div>
                <span className="text-xs text-neutral-dark/60">vs. typical usage</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <i className={`fas fa-${waterEfficiency && waterEfficiency < 0 ? 'check-circle text-success' : 'exclamation-circle text-danger'} mr-1`}></i>
                <span className="text-sm">{waterEfficiency && waterEfficiency < 0 ? 'Good' : 'High Usage'}</span>
              </div>
              <div className="text-xs text-neutral-dark/60">Last 7 days</div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-light to-primary"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
