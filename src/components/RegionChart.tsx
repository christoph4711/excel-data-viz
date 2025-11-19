import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  category: string;
  [key: string]: number | string;
}

interface RegionChartProps {
  title: string;
  data: ChartData[];
}

const RegionChart = ({ title, data }: RegionChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded shadow-lg">
          <p className="font-semibold text-sm mb-1">{payload[0].payload.category}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="category" 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
              domain={[0, 35]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="square"
            />
            <Bar 
              dataKey="2021 mit MH" 
              fill="hsl(var(--chart-3))" 
              name="2021 mit MH"
            />
            <Bar 
              dataKey="2024 mit MH" 
              fill="hsl(var(--chart-1))" 
              name="2024 mit MH"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RegionChart;
