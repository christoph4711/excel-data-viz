import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  category: string;
  [key: string]: number | string;
}

interface AltersklassenChartProps {
  title: string;
  data: ChartData[];
}

const AltersklassenChart = ({ title, data }: AltersklassenChartProps) => {
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
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="hsl(var(--foreground))"
              style={{ fontSize: '12px' }}
              domain={[0, 50]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }}
              iconType="square"
            />
            <Bar 
              dataKey="2021 mit MH (NI)" 
              fill="hsl(var(--chart-3))" 
              name="2021 mit MH (NI)"
            />
            <Bar 
              dataKey="2024 mit MH (NI)" 
              fill="hsl(var(--chart-1))" 
              name="2024 mit MH (NI)"
            />
            <Bar 
              dataKey="2024 mit MH (DE)" 
              fill="hsl(var(--chart-2))" 
              name="2024 mit MH (DE)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AltersklassenChart;
