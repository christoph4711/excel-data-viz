import { useQuery } from '@tanstack/react-query';
import { loadAllSections, SectionData } from '@/lib/excelParser';
import { bevoelkerungsanteilData, altersklassenData, regionData } from '@/data/demographieData';

function convertStaticToSectionData(): SectionData[] {
  return [
    {
      title: bevoelkerungsanteilData.title,
      description: bevoelkerungsanteilData.description,
      chartTitle: bevoelkerungsanteilData.chartTitle,
      chartType: 'stacked',
      chartData: bevoelkerungsanteilData.chartData,
      absolutwerte: bevoelkerungsanteilData.absolutwerte,
      definition: bevoelkerungsanteilData.definition,
    },
    {
      title: altersklassenData.title,
      description: altersklassenData.description,
      chartTitle: altersklassenData.chartTitle,
      chartType: 'grouped',
      chartData: altersklassenData.chartData,
      absolutwerte: {
        ...altersklassenData.absolutwerte,
        quelle: altersklassenData.absolutwerte.quelle || '',
      },
    },
    {
      title: regionData.title,
      description: regionData.description,
      chartTitle: regionData.chartTitle,
      chartType: 'grouped',
      chartData: regionData.chartData,
      absolutwerte: {
        ...regionData.absolutwerte,
        quelle: regionData.absolutwerte.quelle || '',
      },
    },
  ];
}

export function useExcelData() {
  const basePath = import.meta.env.BASE_URL;

  return useQuery<SectionData[]>({
    queryKey: ['excel-data', basePath],
    queryFn: async () => {
      try {
        const sections = await loadAllSections(basePath);
        if (sections.length > 0) return sections;
      } catch (e) {
        console.warn('Excel-Dateien nicht verfügbar, nutze statische Daten:', e);
      }
      return convertStaticToSectionData();
    },
    staleTime: Infinity,
    retry: 0,
  });
}
