import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

interface GenericBarChartProps {
  title: string;
  data: Record<string, string | number>[];
  stacked?: boolean;
}

const GenericBarChart = ({ title, data, stacked = false }: GenericBarChartProps) => {
  // Extract data keys (all keys except "category")
  const dataKeys = data.length > 0
    ? Object.keys(data[0]).filter(k => k !== 'category')
    : [];

  // Auto-detect Y-axis domain
  const allValues = data.flatMap(d => dataKeys.map(k => Number(d[k]) || 0));
  const maxVal = Math.max(...allValues);
  const yMax = stacked
    ? Math.min(100, Math.ceil(maxVal / 10) * 10 + 10)
    : Math.ceil(maxVal / 5) * 5 + 5;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded shadow-lg">
          <p className="font-semibold text-sm mb-1">{payload[0].payload.category}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {Number(entry.value).toFixed(1)}%
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
              domain={[0, yMax]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px' }} iconType="square" />
            {dataKeys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={CHART_COLORS[i % CHART_COLORS.length]}
                name={key}
                stackId={stacked ? 'stack' : undefined}
                radius={stacked && i === dataKeys.length - 1 ? [4, 4, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GenericBarChart;
