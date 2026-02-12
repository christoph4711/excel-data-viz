import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";
import DefinitionBox from "@/components/DefinitionBox";
import GenericBarChart from "@/components/GenericBarChart";
import { useExcelData } from "@/hooks/useExcelData";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionData } from "@/lib/excelParser";

const SectionView = ({ section }: { section: SectionData }) => {
  // Compute min/max from chart data
  const dataKeys = section.chartData.length > 0
    ? Object.keys(section.chartData[0]).filter(k => k !== 'category')
    : [];

  let minVal = Infinity, maxVal = -Infinity;
  let minLabel = '', maxLabel = '';

  for (const row of section.chartData) {
    for (const key of dataKeys) {
      const v = Number(row[key]);
      if (v < minVal) { minVal = v; minLabel = `${row.category} - ${key}`; }
      if (v > maxVal) { maxVal = v; maxLabel = `${row.category} - ${key}`; }
    }
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-foreground mb-4">{section.title}</h2>

      {section.description.length > 0 && (
        <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">
          {section.description.map((item, i) => (
            <li key={i} className="text-base">{item}</li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <GenericBarChart
            title={section.chartTitle}
            data={section.chartData}
            stacked={section.chartType === 'stacked'}
          />
        </div>

        <div className="space-y-4">
          {minVal !== Infinity && (
            <StatCard title="Minimum" value={`${minVal}%`} label={minLabel} variant="min" />
          )}
          {maxVal !== -Infinity && (
            <StatCard title="Maximum" value={`${maxVal}%`} label={maxLabel} variant="max" />
          )}
        </div>
      </div>

      {section.absolutwerte.data.length > 0 && (
        <div className="mb-6">
          <DataTable
            title={section.absolutwerte.title}
            quelle={section.absolutwerte.quelle}
            data={section.absolutwerte.data}
          />
        </div>
      )}

      {section.definition && (
        <DefinitionBox title={section.definition.title} text={section.definition.text} />
      )}
    </section>
  );
};

const Index = () => {
  const { data: sections, isLoading, error } = useExcelData();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pb-12">
        {isLoading && (
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-[400px] w-full" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-destructive p-4 border border-destructive rounded">
            Fehler beim Laden der Daten: {String(error)}
          </div>
        )}

        {sections?.map((section, index) => (
          <div key={index}>
            {index > 0 && <Separator className="my-12" />}
            <SectionView section={section} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Index;
