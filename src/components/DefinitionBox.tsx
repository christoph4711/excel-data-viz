import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DefinitionBoxProps {
  title: string;
  text: string;
}

const DefinitionBox = ({ title, text }: DefinitionBoxProps) => {
  return (
    <Card className="bg-muted border-2 border-dashed border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold italic">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{text}</p>
      </CardContent>
    </Card>
  );
};

export default DefinitionBox;
