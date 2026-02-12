import * as XLSX from 'xlsx';

export interface SectionData {
  title: string;
  description: string[];
  chartTitle: string;
  chartType: 'stacked' | 'grouped';
  chartData: Record<string, string | number>[];
  absolutwerte: {
    title: string;
    quelle: string;
    data: Array<{ label: string; value: number }>;
  };
  definition?: {
    title: string;
    text: string;
  };
}

/**
 * Parst eine Excel-Datei und gibt strukturierte Sektionsdaten zurück.
 * 
 * Erwartetes Excel-Format:
 * 
 * Sheet "Info" (Schlüssel-Wert-Paare in Spalte A und B):
 *   Titel            | 1.1 Bevölkerungsanteil
 *   Beschreibung1    | Mehr als jede vierte Person...
 *   Beschreibung2    | Der bundesweite Anteil...
 *   Diagrammtitel    | Bevölkerung in Niedersachsen...
 *   Diagrammtyp      | stacked   (oder: grouped)
 *   Quelle           | Landesamt für Statistik...
 *   DefinitionTitel  | Definition "Migrationshintergrund":
 *   DefinitionText   | Eine Person hat einen...
 * 
 * Sheet "Diagramm" (erste Spalte = Kategorie, weitere Spalten = Datenserien):
 *   Kategorie | ohneMH | mitMH
 *   2021 (NI) | 76.7   | 23.3
 *   2024 (NI) | 74.0   | 26.0
 * 
 * Sheet "Absolutwerte" (zwei Spalten):
 *   Label                          | Wert
 *   Bevölkerung                    | 7921000
 *   ohne Migrationshintergrund     | 5863000
 */
export function parseExcelFile(data: ArrayBuffer): SectionData {
  const workbook = XLSX.read(data, { type: 'array' });

  // Parse Info sheet
  const infoSheet = workbook.Sheets['Info'];
  if (!infoSheet) throw new Error('Sheet "Info" nicht gefunden');
  const infoRows: string[][] = XLSX.utils.sheet_to_json(infoSheet, { header: 1 });
  const info = new Map<string, string>();
  for (const row of infoRows) {
    if (row[0] && row[1] !== undefined) {
      info.set(String(row[0]).trim(), String(row[1]).trim());
    }
  }

  // Collect descriptions (Beschreibung1, Beschreibung2, ...)
  const descriptions: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const key = `Beschreibung${i}`;
    if (info.has(key)) {
      descriptions.push(info.get(key)!);
    }
  }

  // Parse Diagramm sheet
  const chartSheet = workbook.Sheets['Diagramm'];
  if (!chartSheet) throw new Error('Sheet "Diagramm" nicht gefunden');
  const chartRows: any[][] = XLSX.utils.sheet_to_json(chartSheet, { header: 1 });
  
  const headers = chartRows[0].map(String);
  const chartData: Record<string, string | number>[] = [];
  for (let i = 1; i < chartRows.length; i++) {
    const row = chartRows[i];
    if (!row[0] && row[0] !== 0) continue;
    const entry: Record<string, string | number> = { category: String(row[0]) };
    for (let j = 1; j < headers.length; j++) {
      const val = row[j];
      entry[headers[j]] = typeof val === 'number' ? val : parseFloat(val) || 0;
    }
    chartData.push(entry);
  }

  // Parse Absolutwerte sheet
  const absSheet = workbook.Sheets['Absolutwerte'];
  const absolutData: Array<{ label: string; value: number }> = [];
  if (absSheet) {
    const absRows: any[][] = XLSX.utils.sheet_to_json(absSheet, { header: 1 });
    for (let i = 1; i < absRows.length; i++) {
      const row = absRows[i];
      if (row[0]) {
        absolutData.push({
          label: String(row[0]),
          value: typeof row[1] === 'number' ? row[1] : parseInt(String(row[1]).replace(/\D/g, '')) || 0,
        });
      }
    }
  }

  // Build definition if present
  let definition: SectionData['definition'];
  if (info.has('DefinitionTitel') && info.has('DefinitionText')) {
    definition = {
      title: info.get('DefinitionTitel')!,
      text: info.get('DefinitionText')!,
    };
  }

  return {
    title: info.get('Titel') || 'Ohne Titel',
    description: descriptions,
    chartTitle: info.get('Diagrammtitel') || '',
    chartType: (info.get('Diagrammtyp') || 'grouped') as 'stacked' | 'grouped',
    chartData,
    absolutwerte: {
      title: info.get('AbsolutwerteTitel') || 'Absolutwerte',
      quelle: info.get('Quelle') || '',
      data: absolutData,
    },
    definition,
  };
}

/**
 * Lädt die Manifest-Datei und alle Excel-Dateien.
 */
export async function loadAllSections(basePath: string): Promise<SectionData[]> {
  const manifestUrl = `${basePath}data/manifest.json`;
  const res = await fetch(manifestUrl);
  if (!res.ok) throw new Error(`Manifest nicht gefunden: ${manifestUrl}`);
  const fileNames: string[] = await res.json();

  const sections = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileUrl = `${basePath}data/${fileName}`;
      const fileRes = await fetch(fileUrl);
      if (!fileRes.ok) {
        console.warn(`Excel-Datei nicht gefunden: ${fileUrl}`);
        return null;
      }
      const contentType = fileRes.headers.get('content-type') || '';
      // Skip if server returned HTML (e.g. 404 page) instead of binary
      if (contentType.includes('text/html')) {
        console.warn(`${fileUrl} ist keine Excel-Datei (content-type: ${contentType})`);
        return null;
      }
      const buffer = await fileRes.arrayBuffer();
      if (buffer.byteLength < 100) {
        console.warn(`${fileUrl} ist zu klein, überspringe`);
        return null;
      }
      try {
        return parseExcelFile(buffer);
      } catch (err) {
        console.error(`Fehler beim Parsen von ${fileName}:`, err);
        return null;
      }
    })
  );

  return sections.filter((s): s is SectionData => s !== null);
}
