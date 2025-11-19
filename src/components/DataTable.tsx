import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableProps {
  title: string;
  quelle?: string;
  data: Array<{ label: string; value: number }>;
}

const DataTable = ({ title, quelle, data }: DataTableProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-DE');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Kategorie</TableHead>
              <TableHead className="text-right">Wert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell className="text-right font-mono">{formatNumber(row.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {quelle && (
          <p className="text-xs text-muted-foreground mt-4 italic">
            Quelle: {quelle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
