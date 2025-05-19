import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsageMetrics: FC = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-heading font-semibold text-neutral-dark">Usage Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-dark">Peak Usage Time</span>
              <span className="text-sm text-primary-dark font-medium">07:00 - 09:00</span>
            </div>
            <div className="h-3 w-full bg-neutral-light rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000 ease-in-out" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-dark">Weekly Consumption</span>
              <span className="text-sm text-primary-dark font-medium">873.2 liters</span>
            </div>
            <div className="h-3 w-full bg-neutral-light rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000 ease-in-out" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-neutral-dark">Monthly Target</span>
              <span className="text-sm text-primary-dark font-medium">62% achieved</span>
            </div>
            <div className="h-3 w-full bg-neutral-light rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000 ease-in-out" style={{ width: '62%' }}></div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-neutral-light rounded-lg">
            <div className="flex items-start">
              <i className="fas fa-lightbulb text-xl text-primary-light mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium text-neutral-dark">Water Saving Tip</h3>
                <p className="text-sm text-neutral-dark/70 mt-1">
                  Reducing shower time by just 2 minutes can save up to 10 gallons of water per shower.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageMetrics;
