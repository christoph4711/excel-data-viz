import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";
import DefinitionBox from "@/components/DefinitionBox";
import BevoelkerungsanteilChart from "@/components/BevoelkerungsanteilChart";
import AltersklassenChart from "@/components/AltersklassenChart";
import RegionChart from "@/components/RegionChart";
import { bevoelkerungsanteilData, altersklassenData, regionData } from "@/data/demographieData";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pb-12">
        {/* Sektion 1: Bevölkerungsanteil */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">{bevoelkerungsanteilData.title}</h2>
          
          <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">
            {bevoelkerungsanteilData.description.map((item, index) => (
              <li key={index} className="text-base">{item}</li>
            ))}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <BevoelkerungsanteilChart 
                title={bevoelkerungsanteilData.chartTitle}
                data={bevoelkerungsanteilData.chartData}
              />
            </div>
            
            <div className="space-y-4">
              <StatCard 
                title="Minimum" 
                value={`${bevoelkerungsanteilData.minMax.min.value}%`}
                label={`${bevoelkerungsanteilData.minMax.min.year} - ${bevoelkerungsanteilData.minMax.min.label}`}
                variant="min"
              />
              <StatCard 
                title="Maximum" 
                value={`${bevoelkerungsanteilData.minMax.max.value}%`}
                label={`${bevoelkerungsanteilData.minMax.max.year} - ${bevoelkerungsanteilData.minMax.max.label}`}
                variant="max"
              />
            </div>
          </div>

          <div className="mb-6">
            <DataTable 
              title={bevoelkerungsanteilData.absolutwerte.title}
              quelle={bevoelkerungsanteilData.absolutwerte.quelle}
              data={bevoelkerungsanteilData.absolutwerte.data}
            />
          </div>

          <DefinitionBox 
            title={bevoelkerungsanteilData.definition.title}
            text={bevoelkerungsanteilData.definition.text}
          />
        </section>

        <Separator className="my-12" />

        {/* Sektion 2: Altersklassen */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">{altersklassenData.title}</h2>
          
          <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">
            {altersklassenData.description.map((item, index) => (
              <li key={index} className="text-base">{item}</li>
            ))}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AltersklassenChart 
                title={altersklassenData.chartTitle}
                data={altersklassenData.chartData}
              />
            </div>
            
            <div className="space-y-4">
              <StatCard 
                title="Minimum" 
                value={`${altersklassenData.minMax.min.value}%`}
                label={`${altersklassenData.minMax.min.category} - ${altersklassenData.minMax.min.label}`}
                variant="min"
              />
              <StatCard 
                title="Maximum" 
                value={`${altersklassenData.minMax.max.value}%`}
                label={`${altersklassenData.minMax.max.category} - ${altersklassenData.minMax.max.label}`}
                variant="max"
              />
            </div>
          </div>

          <div className="mb-6">
            <DataTable 
              title={altersklassenData.absolutwerte.title}
              quelle={altersklassenData.absolutwerte.quelle}
              data={altersklassenData.absolutwerte.data}
            />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Sektion 3: Regionen */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">{regionData.title}</h2>
          
          <ul className="list-disc list-inside mb-6 space-y-2 text-foreground">
            {regionData.description.map((item, index) => (
              <li key={index} className="text-base">{item}</li>
            ))}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <RegionChart 
                title={regionData.chartTitle}
                data={regionData.chartData}
              />
            </div>
            
            <div className="space-y-4">
              <StatCard 
                title="Minimum" 
                value={`${regionData.minMax.min.value}%`}
                label={`${regionData.minMax.min.region} - ${regionData.minMax.min.label}`}
                variant="min"
              />
              <StatCard 
                title="Maximum" 
                value={`${regionData.minMax.max.value}%`}
                label={`${regionData.minMax.max.region} - ${regionData.minMax.max.label}`}
                variant="max"
              />
            </div>
          </div>

          <div className="mb-6">
            <DataTable 
              title={regionData.absolutwerte.title}
              quelle={regionData.absolutwerte.quelle}
              data={regionData.absolutwerte.data}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
