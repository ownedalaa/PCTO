import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WaterData } from '@/types/water';

export type ChartType = 'line' | 'bar' | 'area';

export function useWaterData() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentUsage, setCurrentUsage] = useState<number | null>(null);
  const [dailyAverage, setDailyAverage] = useState<number | null>(null);
  const [usageTrend, setUsageTrend] = useState<number | null>(null);
  const [waterEfficiency, setWaterEfficiency] = useState<number | null>(null);

  // Fetch water usage data
  const { 
    data: waterData = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery<WaterData[]>({
    queryKey: ['/api/water-usage'],
    refetchInterval: 3000, // refetch every 3 seconds
    staleTime: 2000, // data is fresh for 2 seconds
  });

  // Update calculated stats when data changes
  useEffect(() => {
    if (waterData.length > 0) {
      // Set last updated timestamp
      setLastUpdated(new Date());
      
      // Set current usage to the most recent value
      setCurrentUsage(waterData[0].value);
      
      // Calculate daily average
      const sum = waterData.reduce((acc, item) => acc + item.value, 0);
      setDailyAverage(sum / waterData.length);
      
      // Calculate trend (percentage change from previous reading)
      if (waterData.length > 1) {
        const currentValue = waterData[0].value;
        const previousValue = waterData[1].value;
        const trend = ((currentValue - previousValue) / previousValue) * 100;
        setUsageTrend(trend);
      }
      
      // Set water efficiency (mock calculation for demonstration)
      // In a real app, this would compare with historical data or benchmarks
      const typicalUsage = 80; // typical water usage in liters (benchmark)
      const actualUsage = waterData[0].value;
      const efficiency = ((actualUsage - typicalUsage) / typicalUsage) * 100;
      setWaterEfficiency(efficiency);
    }
  }, [waterData]);

  return {
    waterData,
    isLoading,
    error,
    lastUpdated,
    currentUsage,
    dailyAverage,
    usageTrend,
    waterEfficiency,
    chartType,
    setChartType,
    refetch
  };
}
