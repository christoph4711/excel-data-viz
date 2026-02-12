// Run this script once to generate Excel template files from the existing static data.
// Usage: node scripts/generateExcel.mjs
// Requires: npm install xlsx

import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ---- 1. Bevölkerungsanteil ----
{
  const wb = XLSX.utils.book_new();

  const info = [
    ['Titel', '1.1 Bevölkerungsanteil'],
    ['Beschreibung1', 'Mehr als jede vierte Person (26,0 %) hatte 2024 einen Migrationshintergrund (MH), 2,7 Prozentpunkte mehr als 2021.'],
    ['Beschreibung2', 'Der bundesweite Anteil 2024 lag mit 30,4 % über dem niedersächsischen Wert.'],
    ['Diagrammtitel', '1.1 Bevölkerung in Niedersachsen und Deutschland 2021 und 2024 nach Migrationshintergrund in Prozent'],
    ['Diagrammtyp', 'stacked'],
    ['AbsolutwerteTitel', 'Absolutwerte für 2024 mit MH in Niedersachsen:'],
    ['Quelle', 'Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)'],
    ['DefinitionTitel', 'Definition "Migrationshintergrund" (MH):'],
    ['DefinitionText', 'Eine Person hat einen Migrationshintergrund, wenn sie selbst oder mindestens ein Elternteil nicht mit deutscher Staatsangehörigkeit geboren wurde. Im Einzelnen umfasst diese Definition zugewanderte und nicht zugewanderte Ausländerinnen und Ausländer, zugewanderte und nicht zugewanderte Eingebürgerte, (Spät-)Aussiedlerinnen und (Spät-)Aussiedler sowie die als Deutsche geborenen Nachkommen dieser Gruppen.'],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(info), 'Info');

  const chart = [
    ['Kategorie', 'ohneMH', 'mitMH'],
    ['2021 (NI)', 76.7, 23.3],
    ['2024 (NI)', 74.0, 26.0],
    ['2024 (DE)', 69.6, 30.4],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(chart), 'Diagramm');

  const abs = [
    ['Label', 'Wert'],
    ['Bevölkerung', 7921000],
    ['ohne Migrationshintergrund', 5863000],
    ['mit Migrationshintergrund', 2058000],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(abs), 'Absolutwerte');

  XLSX.writeFile(wb, path.join(outDir, '1_1_Bevoelkerungsanteil.xlsx'));
  console.log('✓ 1_1_Bevoelkerungsanteil.xlsx erstellt');
}

// ---- 2. Altersklassen ----
{
  const wb = XLSX.utils.book_new();

  const info = [
    ['Titel', '1.2 Bevölkerung nach Altersklassen'],
    ['Beschreibung1', 'Der Anteil von Menschen mit Migrationshintergrund ist in jüngeren Altersgruppen deutlich höher.'],
    ['Beschreibung2', 'Bei Kindern unter 15 Jahren liegt der Anteil bei 38,5 % (2024 in Niedersachsen).'],
    ['Diagrammtitel', 'Anteil mit Migrationshintergrund nach Altersgruppen'],
    ['Diagrammtyp', 'grouped'],
    ['AbsolutwerteTitel', 'Absolutwerte für 2024 mit MH in Niedersachsen:'],
    ['Quelle', 'Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)'],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(info), 'Info');

  const chart = [
    ['Kategorie', '2021 mit MH (NI)', '2024 mit MH (NI)', '2024 mit MH (DE)'],
    ['unter 15', 36.2, 38.5, 42.5],
    ['15-25', 29.6, 34.0, 40.0],
    ['25-35', 29.2, 31.0, 38.1],
    ['35-45', 30.0, 34.5, 37.7],
    ['45-55', 21.8, 26.6, 33.6],
    ['55-65', 15.8, 16.8, 19.9],
    ['65+', 11.4, 13.1, 15.1],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(chart), 'Diagramm');

  const abs = [
    ['Label', 'Wert'],
    ['unter 15 Jahre', 433000],
    ['15 bis unter 25 Jahre', 277000],
    ['25 bis unter 35 Jahre', 299000],
    ['35 bis unter 45 Jahre', 341000],
    ['45 bis unter 55 Jahre', 262000],
    ['55 bis unter 65 Jahre', 215000],
    ['65 und älter', 230000],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(abs), 'Absolutwerte');

  XLSX.writeFile(wb, path.join(outDir, '1_2_Altersklassen.xlsx'));
  console.log('✓ 1_2_Altersklassen.xlsx erstellt');
}

// ---- 3. Regionen ----
{
  const wb = XLSX.utils.book_new();

  const info = [
    ['Titel', '1.3 Bevölkerung nach Regionen'],
    ['Beschreibung1', 'Die Region Hannover hat mit 30,7 % den höchsten Anteil an Menschen mit Migrationshintergrund.'],
    ['Beschreibung2', 'Alle Regionen zeigen einen Anstieg zwischen 2021 und 2024.'],
    ['Diagrammtitel', 'Anteil mit Migrationshintergrund nach Regionen in Prozent'],
    ['Diagrammtyp', 'grouped'],
    ['AbsolutwerteTitel', 'Absolutwerte für 2024 mit MH in Niedersachsen:'],
    ['Quelle', 'Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)'],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(info), 'Info');

  const chart = [
    ['Kategorie', '2021 mit MH', '2024 mit MH'],
    ['Braunschweig', 24.9, 26.7],
    ['Hannover', 27.2, 30.7],
    ['Lüneburg', 18.4, 21.6],
    ['Weser-Ems', 22.4, 24.6],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(chart), 'Diagramm');

  const abs = [
    ['Label', 'Wert'],
    ['Braunschweig', 419000],
    ['Hannover', 681000],
    ['Lüneburg', 329000],
    ['Weser-Ems', 627000],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(abs), 'Absolutwerte');

  XLSX.writeFile(wb, path.join(outDir, '1_3_Regionen.xlsx'));
  console.log('✓ 1_3_Regionen.xlsx erstellt');
}

console.log('\nAlle Excel-Dateien wurden in public/data/ erstellt.');
console.log('Vergiss nicht, sie in Git einzuchecken!');
