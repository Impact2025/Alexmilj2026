// Mindset quotes for daily ritual
export const QUOTES = [
  // Michael Pilarczyk
  {
    quote: "Je wordt niet wat je hoopt. Je wordt waar je echt in gelooft.",
    author: "Michael Pilarczyk",
    category: "geloof"
  },
  {
    quote: "Dromen zonder actie zijn alleen maar dromen.",
    author: "Michael Pilarczyk",
    category: "actie"
  },
  {
    quote: "Je bent niet wat je denkt dat je bent. Je bent wat je denkt.",
    author: "Michael Pilarczyk",
    category: "mindset"
  },
  {
    quote: "Succes begint bij je mindset, niet bij je omstandigheden.",
    author: "Michael Pilarczyk",
    category: "mindset"
  },
  
  // Napoleon Hill
  {
    quote: "Wat je geest kan bedenken en geloven, kan je bereiken.",
    author: "Napoleon Hill",
    category: "geloof"
  },
  {
    quote: "Elke tegenslag draagt het zaad van een gelijk of groter voordeel.",
    author: "Napoleon Hill",
    category: "doorzetten"
  },
  {
    quote: "Het startpunt van alle prestatie is verlangen.",
    author: "Napoleon Hill",
    category: "motivatie"
  },
  {
    quote: "Rijkdom begint als een gedachte.",
    author: "Napoleon Hill",
    category: "mindset"
  },
  
  // Anderen
  {
    quote: "Elke expert was ooit een beginner.",
    author: "Helen Hayes",
    category: "groei"
  },
  {
    quote: "Het geheim van vooruitgang is beginnen.",
    author: "Mark Twain",
    category: "actie"
  },
  {
    quote: "Fouten zijn het bewijs dat je het probeert.",
    author: "Onbekend",
    category: "fouten"
  },
  {
    quote: "Je mist 100% van de kansen die je niet neemt.",
    author: "Wayne Gretzky",
    category: "actie"
  },
  {
    quote: "Kleine stappen elke dag leiden tot grote resultaten.",
    author: "James Clear",
    category: "consistentie"
  },
  {
    quote: "Geloof dat je het kunt en je bent halverwege.",
    author: "Theodore Roosevelt",
    category: "geloof"
  },
  {
    quote: "De beste tijd om te beginnen was gisteren. De op een na beste tijd is nu.",
    author: "Chinees spreekwoord",
    category: "actie"
  },
  {
    quote: "Succes is niet definitief, falen is niet fataal: het is de moed om door te gaan die telt.",
    author: "Winston Churchill",
    category: "doorzetten"
  },
  {
    quote: "Je bent nooit te jong om te dromen.",
    author: "Onbekend",
    category: "dromen"
  },
  {
    quote: "Werk harder aan jezelf dan aan je werk.",
    author: "Jim Rohn",
    category: "groei"
  },
  {
    quote: "De enige limiet is de limiet die je jezelf oplegt.",
    author: "Onbekend",
    category: "mindset"
  },
  {
    quote: "Discipline is de brug tussen doelen en prestaties.",
    author: "Jim Rohn",
    category: "discipline"
  },
  
  // Kind-vriendelijke quotes
  {
    quote: "Je bent sterker dan je denkt!",
    author: "Winnie de Poeh",
    category: "geloof"
  },
  {
    quote: "Als je droomt, droom dan groots!",
    author: "Onbekend",
    category: "dromen"
  },
  {
    quote: "Vandaag is een perfecte dag om geweldig te zijn.",
    author: "Onbekend",
    category: "motivatie"
  },
  {
    quote: "Je bent de baas over je eigen gedachten.",
    author: "Onbekend",
    category: "mindset"
  },
  {
    quote: "Probeer, faal, leer, herhaal.",
    author: "Onbekend",
    category: "groei"
  },
  {
    quote: "Elke dag is een nieuwe kans.",
    author: "Onbekend",
    category: "motivatie"
  },
  {
    quote: "Jouw enige concurrent is wie jij gisteren was.",
    author: "Onbekend",
    category: "groei"
  },
  {
    quote: "Grote dingen beginnen klein.",
    author: "Onbekend",
    category: "begin"
  }
];

// Get random quote
export const getRandomQuote = () => {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
};

// Get quote by category
export const getQuoteByCategory = (category) => {
  const filtered = QUOTES.filter(q => q.category === category);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

// Get quote of the day (consistent per day)
export const getQuoteOfTheDay = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return QUOTES[dayOfYear % QUOTES.length];
};
