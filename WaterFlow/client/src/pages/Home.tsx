import { useEffect } from "react";
import Header from "@/components/Header";
import WaterUsageChart from "@/components/WaterUsageChart";
import StatsCards from "@/components/StatsCards";
import RecentReadings from "@/components/RecentReadings";
import UsageMetrics from "@/components/UsageMetrics";
import UsageBreakdown from "@/components/UsageBreakdown";
import Footer from "@/components/Footer";
import { useWaterData } from "@/hooks/useWaterData";

export default function Home() {
  const { 
    waterData, 
    isLoading, 
    error, 
    lastUpdated,
    currentUsage,
    dailyAverage,
    usageTrend,
    waterEfficiency,
    chartType,
    setChartType
  } = useWaterData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-light text-neutral-dark">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-heading font-semibold mb-4">Error Loading Data</h1>
          <p className="text-neutral-dark/70">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-light to-neutral-lighter font-sans">
      <Header lastUpdated={lastUpdated} />
      
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        <StatsCards 
          currentUsage={currentUsage} 
          dailyAverage={dailyAverage} 
          usageTrend={usageTrend}
          waterEfficiency={waterEfficiency}
          isLoading={isLoading} 
        />
        
        <WaterUsageChart 
          waterData={waterData} 
          isLoading={isLoading} 
          chartType={chartType}
          setChartType={setChartType}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RecentReadings waterData={waterData} isLoading={isLoading} />
          <UsageMetrics />
        </div>
        
        <UsageBreakdown />
      </main>
      
      <Footer />
    </div>
  );
}
