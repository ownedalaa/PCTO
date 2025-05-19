import { FC, useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { WaterData } from '@/types/water';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartType } from '@/hooks/useWaterData';
import { BarChart3, LineChart, AreaChart } from 'lucide-react';

Chart.register(...registerables);

interface WaterUsageChartProps {
  waterData: WaterData[];
  isLoading: boolean;
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

const WaterUsageChart: FC<WaterUsageChartProps> = ({ 
  waterData, 
  isLoading,
  chartType,
  setChartType
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || waterData.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = waterData.map(item => 
      new Date(item.timestamp).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    );
    
    const values = waterData.map(item => item.value);

    chartInstanceRef.current = new Chart(ctx, {
      type: chartType === 'area' ? 'line' : chartType,
      data: {
        labels,
        datasets: [{
          label: 'Water Usage (liters)',
          data: values,
          backgroundColor: 'rgba(8, 145, 178, 0.2)',
          borderColor: 'rgba(8, 145, 178, 1)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(8, 145, 178, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          tension: 0.4,
          fill: chartType === 'area'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad'
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              family: "'Inter', sans-serif",
              weight: 'bold'
            },
            bodyFont: {
              size: 13,
              family: "'Inter', sans-serif"
            },
            callbacks: {
              label: function(context) {
                return `${context.parsed.y} liters`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [waterData, chartType]);

  return (
    <Card className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-heading font-semibold text-neutral-dark">Water Usage History</h2>
            <p className="text-sm text-neutral-dark/70 mt-1">Displaying last {waterData.length} readings</p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              variant={chartType === 'line' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType('line')}
              className={chartType === 'line' ? 'bg-primary text-white' : ''}
            >
              <LineChart className="w-4 h-4 mr-1" />
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType('bar')}
              className={chartType === 'bar' ? 'bg-primary text-white' : ''}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Bar
            </Button>
            <Button
              variant={chartType === 'area' ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType('area')}
              className={chartType === 'area' ? 'bg-primary text-white' : ''}
            >
              <AreaChart className="w-4 h-4 mr-1" />
              Area
            </Button>
          </div>
        </div>
        
        <div className="h-[50vh] max-h-[400px] w-full relative">
          {isLoading && waterData.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <canvas ref={chartRef}></canvas>
          )}
        </div>
        
        <div className="flex justify-between mt-4 text-sm text-neutral-dark/70">
          <div>
            <i className="fas fa-info-circle mr-1"></i>
            Data automatically updates every 3 seconds
          </div>
          <div>
            Showing {waterData.length} data points
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterUsageChart;
