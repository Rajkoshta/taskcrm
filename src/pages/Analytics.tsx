
import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import Breadcrumb from "@/components/Breadcrumb";

const analyticsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 2100 },
  { name: "Mar", value: 800 },
  { name: "Apr", value: 1600 },
  { name: "May", value: 900 },
  { name: "Jun", value: 1700 },
];

const serviceUsageData = [
  { name: "Basic Plan", total: 15, available: 5 },
  { name: "Premium Plan", total: 25, available: 10 },
  { name: "Enterprise Plan", total: 10, available: 3 },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <Breadcrumb />
      
      <header>
        <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
        <p className="text-secondary-foreground">Track your financial and service performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8989DE"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Service Usage</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceUsageData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="total" fill="#8989DE" name="Total Users" />
                <Bar dataKey="available" fill="#82ca9d" name="Available Slots" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
