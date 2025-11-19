// Daten aus den Excel-Dateien

export const bevoelkerungsanteilData = {
  title: "1.1 Bevölkerungsanteil",
  description: [
    "Mehr als jede vierte Person (26,0 %) hatte 2024 einen Migrationshintergrund (MH), 2,7 Prozentpunkte mehr als 2021.",
    "Der bundesweite Anteil 2024 lag mit 30,4 % über dem niedersächsischen Wert."
  ],
  chartTitle: "1.1 Bevölkerung in Niedersachsen und Deutschland 2021 und 2024 nach Migrationshintergrund in Prozent",
  chartData: [
    {
      category: "2021 (NI)",
      ohneMH: 76.7,
      mitMH: 23.3
    },
    {
      category: "2024 (NI)",
      ohneMH: 74.0,
      mitMH: 26.0
    },
    {
      category: "2024 (DE)",
      ohneMH: 69.6,
      mitMH: 30.4
    }
  ],
  absolutwerte: {
    title: "Absolutwerte für 2024 mit MH in Niedersachsen:",
    quelle: "Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)",
    data: [
      { label: "Bevölkerung", value: 7921000 },
      { label: "ohne Migrationshintergrund", value: 5863000 },
      { label: "mit Migrationshintergrund", value: 2058000 }
    ]
  },
  definition: {
    title: 'Definition "Migrationshintergrund" (MH):',
    text: 'Eine Person hat einen Migrationshintergrund, wenn sie selbst oder mindestens ein Elternteil nicht mit deutscher Staatsangehörigkeit geboren wurde. Im Einzelnen umfasst diese Definition zugewanderte und nicht zugewanderte Ausländerinnen und Ausländer, zugewanderte und nicht zugewanderte Eingebürgerte, (Spät-)Aussiedlerinnen und (Spät-)Aussiedler sowie die als Deutsche geborenen Nachkommen dieser Gruppen.'
  },
  minMax: {
    min: { year: "2021 (NI)", value: 23.3, label: "mit MH" },
    max: { year: "2024 (DE)", value: 30.4, label: "mit MH" }
  }
};

export const altersklassenData = {
  title: "1.2 Bevölkerung nach Altersklassen",
  description: [
    "Der Anteil von Menschen mit Migrationshintergrund ist in jüngeren Altersgruppen deutlich höher.",
    "Bei Kindern unter 15 Jahren liegt der Anteil bei 38,5 % (2024 in Niedersachsen)."
  ],
  chartTitle: "Anteil mit Migrationshintergrund nach Altersgruppen",
  chartData: [
    {
      category: "unter 15",
      "2021 mit MH (NI)": 36.2,
      "2024 mit MH (NI)": 38.5,
      "2024 mit MH (DE)": 42.5
    },
    {
      category: "15-25",
      "2021 mit MH (NI)": 29.6,
      "2024 mit MH (NI)": 34.0,
      "2024 mit MH (DE)": 40.0
    },
    {
      category: "25-35",
      "2021 mit MH (NI)": 29.2,
      "2024 mit MH (NI)": 31.0,
      "2024 mit MH (DE)": 38.1
    },
    {
      category: "35-45",
      "2021 mit MH (NI)": 30.0,
      "2024 mit MH (NI)": 34.5,
      "2024 mit MH (DE)": 37.7
    },
    {
      category: "45-55",
      "2021 mit MH (NI)": 21.8,
      "2024 mit MH (NI)": 26.6,
      "2024 mit MH (DE)": 33.6
    },
    {
      category: "55-65",
      "2021 mit MH (NI)": 15.8,
      "2024 mit MH (NI)": 16.8,
      "2024 mit MH (DE)": 19.9
    },
    {
      category: "65+",
      "2021 mit MH (NI)": 11.4,
      "2024 mit MH (NI)": 13.1,
      "2024 mit MH (DE)": 15.1
    }
  ],
  absolutwerte: {
    title: "Absolutwerte für 2024 mit MH in Niedersachsen:",
    quelle: "Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)",
    data: [
      { label: "unter 15 Jahre", value: 433000 },
      { label: "15 bis unter 25 Jahre", value: 277000 },
      { label: "25 bis unter 35 Jahre", value: 299000 },
      { label: "35 bis unter 45 Jahre", value: 341000 },
      { label: "45 bis unter 55 Jahre", value: 262000 },
      { label: "55 bis unter 65 Jahre", value: 215000 },
      { label: "65 und älter", value: 230000 }
    ]
  },
  minMax: {
    min: { category: "65+", value: 11.4, label: "2021 mit MH (NI)" },
    max: { category: "unter 15", value: 42.5, label: "2024 mit MH (DE)" }
  }
};

export const regionData = {
  title: "1.3 Bevölkerung nach Regionen",
  description: [
    "Die Region Hannover hat mit 30,7 % den höchsten Anteil an Menschen mit Migrationshintergrund.",
    "Alle Regionen zeigen einen Anstieg zwischen 2021 und 2024."
  ],
  chartTitle: "Anteil mit Migrationshintergrund nach Regionen in Prozent",
  chartData: [
    {
      category: "Braunschweig",
      "2021 mit MH": 24.9,
      "2024 mit MH": 26.7
    },
    {
      category: "Hannover",
      "2021 mit MH": 27.2,
      "2024 mit MH": 30.7
    },
    {
      category: "Lüneburg",
      "2021 mit MH": 18.4,
      "2024 mit MH": 21.6
    },
    {
      category: "Weser-Ems",
      "2021 mit MH": 22.4,
      "2024 mit MH": 24.6
    }
  ],
  absolutwerte: {
    title: "Absolutwerte für 2024 mit MH in Niedersachsen:",
    quelle: "Landesamt für Statistik Niedersachsen – Mikrozensus 2024 (Erstergebnis)",
    data: [
      { label: "Braunschweig", value: 419000 },
      { label: "Hannover", value: 681000 },
      { label: "Lüneburg", value: 329000 },
      { label: "Weser-Ems", value: 627000 }
    ]
  },
  minMax: {
    min: { region: "Lüneburg", value: 18.4, label: "2021" },
    max: { region: "Hannover", value: 30.7, label: "2024" }
  }
};
