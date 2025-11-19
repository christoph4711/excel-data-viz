import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  label?: string;
  variant?: "default" | "min" | "max";
}

const StatCard = ({ title, value, label, variant = "default" }: StatCardProps) => {
  const bgColor = variant === "min" 
    ? "bg-muted" 
    : variant === "max" 
    ? "bg-secondary" 
    : "bg-card";

  const textColor = variant === "max" ? "text-secondary-foreground" : "text-card-foreground";

  return (
    <Card className={`${bgColor} border-border`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm font-medium ${textColor}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
        {label && <p className={`text-xs mt-1 ${textColor} opacity-80`}>{label}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
