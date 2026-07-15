// Weekly missions for the entire year.
// Elke missie heeft een laagdrempelige basis (steps) én een open "masterChallenge"
// (Meester-uitdaging) die het plafond verhoogt voor een kind dat meer aankan.
// De Ikigai-pijler wordt afgeleid uit de categorie (zie IKIGAI + getIkigai).
export const MISSIONS = [
  // Q1: FUNDAMENT (Week 1-13)
  {
    week: 1,
    title: "Mijn Droom Visualiseren",
    category: "mindset",
    description: "Maak een Vision Board van jouw droomleven",
    steps: [
      "Zoek 10 plaatjes van dingen die jij wilt bereiken",
      "Print ze uit of maak een digitaal board",
      "Hang het op een plek waar je het elke dag ziet",
      "Vertel in de video waarom je deze dingen wilt"
    ],
    xpReward: 100,
    skill: "Visualisatie",
    tips: "Denk aan: de Lamborghini, je droomhuis, reizen, wat je wilt kunnen",
    masterChallenge: "Kies één droom van je board en maak een 'tijdlijn terug': welke 5 mijlpalen moeten er in welke volgorde gebeuren, en wat kun je deze maand al starten?"
  },
  {
    week: 2,
    title: "Mijn Eerste Spaarplan",
    category: "geld",
    description: "Leer hoe rijke mensen denken over geld",
    steps: [
      "Leer de 10% regel: spaar altijd 10% van wat je krijgt",
      "Maak 3 potjes: Sparen, Uitgeven, Weggeven",
      "Reken uit: hoeveel is 10% van je zakgeld?",
      "Leg uit in de video waarom sparen slim is"
    ],
    xpReward: 120,
    skill: "Financiën",
    tips: "Tip uit 'De Rijkste Man van Babylon': betaal jezelf EERST",
    masterChallenge: "Bouw je eigen spaarsysteem in een spreadsheet met formules die automatisch 10% berekenen en je saldo per maand voor een heel jaar voorspellen."
  },
  {
    week: 3,
    title: "AI Ontdekken",
    category: "skills",
    description: "Ontdek wat AI kan en maak je eerste creatie",
    steps: [
      "Vraag ChatGPT om een verhaal over jou te schrijven",
      "Maak een plaatje met AI van jouw droomauto",
      "Bedenk 3 manieren hoe AI jou kan helpen",
      "Laat je creaties zien in de video"
    ],
    xpReward: 150,
    skill: "Technologie",
    tips: "AI is een tool - jij blijft de baas en bepaalt wat je ermee doet",
    masterChallenge: "Laat AI én jij hetzelfde lastige probleem oplossen. Waar zat AI ernaast? Schrijf op waar jouw menselijke denken beter was dan de machine."
  },
  {
    week: 4,
    title: "Mijn Waarom",
    category: "mindset",
    description: "Waarom wil JIJ groeien en iets moois neerzetten?",
    steps: [
      "Schrijf 10 redenen op waarom je dit doel wilt bereiken",
      "Kies de 3 belangrijkste redenen",
      "Maak er een poster of tekening van",
      "Leg in de video uit wat jouw 'waarom' is"
    ],
    xpReward: 100,
    skill: "Doelbepaling",
    tips: "Als je 'waarom' sterk genoeg is, vind je altijd een 'hoe'",
    masterChallenge: "Bedenk je 'anti-waarom': wat gebeurt er over 10 jaar als je NIETS met je dromen doet? Vergelijk beide toekomsten met elkaar."
  },
  {
    week: 5,
    title: "De 10% Regel in Actie",
    category: "geld",
    description: "Maak sparen automatisch",
    steps: [
      "Tel al je geld (zakgeld, cadeaus, etc.)",
      "Bereken 10% en stop dit in je spaarpotje",
      "Maak een 'spaar-tracker' om bij te houden",
      "Laat in de video zien hoeveel je al hebt gespaard"
    ],
    xpReward: 100,
    skill: "Discipline",
    tips: "Automatisch sparen = je hoeft er niet over na te denken",
    masterChallenge: "Als je elke week 10% van €10 spaart én 5% rente per jaar krijgt: hoeveel heb je na 5 jaar? Maak een grafiek en leg de 'rente-op-rente'-knik uit."
  },
  {
    week: 6,
    title: "Fouten Zijn Lessen",
    category: "mindset",
    description: "Leer van je fouten in plaats van opgeven",
    steps: [
      "Schrijf 3 fouten op die je ooit gemaakt hebt",
      "Bedenk wat je van elke fout hebt geleerd",
      "Vraag papa naar zijn grootste fout en wat hij leerde",
      "Deel in de video: welke fout heeft jou het meest geleerd?"
    ],
    xpReward: 100,
    skill: "Groeimindset",
    tips: "Elke succesvolle persoon heeft veel fouten gemaakt!",
    masterChallenge: "Interview 3 volwassenen over een échte mislukking. Zoek het patroon: wat hadden hun lessen met elkaar gemeen?"
  },
  {
    week: 7,
    title: "YouTube Basics",
    category: "skills",
    description: "Maak je beste video-intro ooit",
    steps: [
      "Kijk 3 YouTube kanalen die jij leuk vindt",
      "Let op: hoe beginnen zij hun video's?",
      "Oefen je eigen intro 5 keer",
      "Neem je beste intro op voor de video"
    ],
    xpReward: 150,
    skill: "Presenteren",
    tips: "Een goede intro: kort, energiek, en vertelt wat de video over gaat",
    masterChallenge: "Analyseer waarom een virale video werkt: schrijf de eerste 15 seconden woord-voor-woord uit en benoem 3 technieken die de kijker vasthouden."
  },
  {
    week: 8,
    title: "Rijke Mensen Denken Anders",
    category: "mindset",
    description: "Leer hoe succesvolle mensen denken",
    steps: [
      "Lees samen met papa hoofdstuk 1 van 'Think and Grow Rich'",
      "Schrijf 5 dingen op die je hebt geleerd",
      "Kies 1 tip om deze week te gebruiken",
      "Leg in de video uit wat je geleerd hebt"
    ],
    xpReward: 120,
    skill: "Kennis",
    tips: "Napoleon Hill interviewde 500+ succesvolle mensen voor dit boek",
    masterChallenge: "Kies één principe uit het boek en test het een week lang als experiment. Meet het resultaat en trek een eigen conclusie."
  },
  {
    week: 9,
    title: "Mijn Eerste €10",
    category: "actie",
    description: "Verdien je eerste tientje als ondernemer",
    steps: [
      "Bedenk 5 manieren om €10 te verdienen",
      "Kies 1 manier en maak een plan",
      "Voer je plan uit",
      "Vertel in de video hoe het ging en wat je verdiende"
    ],
    xpReward: 200,
    skill: "Ondernemen",
    tips: "Ideeën: autowassen, hond uitlaten, oude spullen verkopen, hulp aanbieden",
    masterChallenge: "Reken je 'winst per uur' uit: wat kostte 1 verkoop aan tijd en materiaal, en wat hield je netto over? Hoe zou je die winst per uur verdubbelen?"
  },
  {
    week: 10,
    title: "AI Art Master",
    category: "skills",
    description: "Maak een portfolio van 10 AI kunstwerken",
    steps: [
      "Leer hoe je betere 'prompts' schrijft voor AI",
      "Maak 10 verschillende AI afbeeldingen",
      "Kies je 3 favorieten",
      "Presenteer je portfolio in de video"
    ],
    xpReward: 150,
    skill: "AI & Creativiteit",
    tips: "Goede prompts = specifiek + stijl + details",
    masterChallenge: "Ontwikkel een eigen herkenbare stijl: schrijf één 'stijl-prompt' die je hergebruikt, zodat vreemden je 10 werken als één serie herkennen."
  },
  {
    week: 11,
    title: "Dankbaarheid Week",
    category: "mindset",
    description: "Ontdek de kracht van dankbaarheid",
    steps: [
      "Schrijf elke dag 3 dingen op waar je dankbaar voor bent",
      "Stuur 1 persoon een berichtje om te bedanken",
      "Maak een 'dankbaarheids-muur' met post-its",
      "Deel in de video hoe dankbaarheid je voelt"
    ],
    xpReward: 100,
    skill: "Positief denken",
    tips: "Dankbare mensen zijn gelukkiger EN succesvoller",
    masterChallenge: "Doe een experiment: schrijf 7 dagen 's ochtends 3 dankbaarheden en meet elke avond je humeur (1-10). Zie je een patroon in je eigen data?"
  },
  {
    week: 12,
    title: "Mijn Sterke Punten",
    category: "mindset",
    description: "Ontdek waar jij goed in bent",
    steps: [
      "Vraag 3 mensen: waar ben ik goed in?",
      "Schrijf zelf 5 dingen op waar je goed in bent",
      "Bedenk hoe je je sterke punten kunt gebruiken om iets moois te maken",
      "Presenteer je sterke punten in de video"
    ],
    xpReward: 120,
    skill: "Zelfkennis",
    tips: "Focus op je sterke punten, niet je zwakke",
    masterChallenge: "Combineer 2 van je sterke punten tot een uniek 'superpower-idee' dat niemand anders in je klas zó heeft. Pitch waarom die combinatie zeldzaam is."
  },
  {
    week: 13,
    title: "Q1 Review",
    category: "review",
    description: "Terugblik op je eerste kwartaal",
    steps: [
      "Bekijk al je video's van week 1-12",
      "Schrijf op: wat ging goed, wat was moeilijk?",
      "Hoeveel XP heb je verdiend? Hoeveel gespaard?",
      "Maak een speciale review-video"
    ],
    xpReward: 200,
    skill: "Reflectie",
    tips: "Vier je successen! Je hebt al 12 weken volgehouden!",
    masterChallenge: "Maak een dashboard van je eigen data (XP, gespaard, missies). Welke week gaf de meeste groei per uur, en waarom denk je dat?"
  },

  // Q2: BOUWEN (Week 14-26)
  {
    week: 14,
    title: "Mijn Eerste Product",
    category: "actie",
    description: "Bedenk iets dat je kunt verkopen",
    steps: [
      "Brainstorm: wat kun jij maken of aanbieden?",
      "Kies 1 product of dienst",
      "Maak een simpel 'businessplan' (1 pagina)",
      "Pitch je idee in de video"
    ],
    xpReward: 180,
    skill: "Ondernemerschap",
    tips: "Start simpel - je eerste product hoeft niet perfect te zijn",
    masterChallenge: "Bedenk 3 versies van je product voor 3 verschillende klanten. Leg uit waarom prijs én boodschap per klant verschillen."
  },
  {
    week: 15,
    title: "Interview een Held",
    category: "skills",
    description: "Leer van iemand die je bewondert",
    steps: [
      "Kies iemand die je bewondert (familie, bekende, etc.)",
      "Bereid 5 goede vragen voor",
      "Interview deze persoon",
      "Deel de beste lessen in je video"
    ],
    xpReward: 150,
    skill: "Netwerken",
    tips: "Goede vragen: 'Wat is je grootste les?' 'Welke fout heb je gemaakt?'",
    masterChallenge: "Blijf doorvragen tot je een antwoord krijgt dat je verraste. Schrijf op welke vervolgvraag dat opleverde — de kunst zit in het doorvragen."
  },
  {
    week: 16,
    title: "AI voor School",
    category: "skills",
    description: "Gebruik AI om slimmer te leren",
    steps: [
      "Laat AI een moeilijk onderwerp uitleggen",
      "Maak AI-gegenereerde flashcards",
      "Laat AI je helpen met huiswerk (maar schrijf zelf!)",
      "Laat in de video zien hoe AI je helpt leren"
    ],
    xpReward: 120,
    skill: "Slim leren",
    tips: "AI is je leer-assistent, niet je vervanger",
    masterChallenge: "Laat AI je overhoren op je moeilijkste vak en jouw fouten uitleggen. Ontwerp daarna je eigen 'leer-prompt' die je steeds hergebruikt."
  },
  {
    week: 17,
    title: "Mijn Budget",
    category: "geld",
    description: "Waar gaat je geld naartoe?",
    steps: [
      "Schrijf alles op wat je de afgelopen maand hebt uitgegeven",
      "Verdeel in categorieën (snoep, games, sparen, etc.)",
      "Maak een cirkeldiagram",
      "Bespreek je budget in de video"
    ],
    xpReward: 100,
    skill: "Budgetteren",
    tips: "Je kunt alleen verbeteren wat je meet",
    masterChallenge: "Voorspel je uitgaven voor volgende maand vóórdat die begint. Vergelijk aan het eind je voorspelling met de werkelijkheid — hoe goed ken je jezelf?"
  },
  {
    week: 18,
    title: "De 60-Seconden Pitch",
    category: "skills",
    description: "Leer je idee in 1 minuut te presenteren",
    steps: [
      "Schrijf een korte pitch voor je product/dienst",
      "Oefen tot je het in 60 seconden kunt",
      "Pitch aan 3 mensen en vraag feedback",
      "Doe je beste pitch in de video"
    ],
    xpReward: 150,
    skill: "Presenteren",
    tips: "Structuur: Probleem → Oplossing → Waarom jij?",
    masterChallenge: "Maak 3 versies van je pitch: voor een kind, voor een oma en voor een investeerder. Wat verandert er per publiek en waarom?"
  },
  {
    week: 19,
    title: "Mijn Eerste Klant",
    category: "actie",
    description: "Verkoop iets aan een echte klant",
    steps: [
      "Bepaal je prijs",
      "Vind iemand die het wil kopen",
      "Doe de verkoop",
      "Vertel in de video hoe het voelde!"
    ],
    xpReward: 250,
    skill: "Verkopen",
    tips: "Je eerste verkoop is ALTIJD de moeilijkste - daarna wordt het makkelijker",
    masterChallenge: "Vraag je klant ná de koop: waarom kocht je precies bij mij? Gebruik dat antwoord om je volgende verkoop concreet te verbeteren."
  },
  {
    week: 20,
    title: "Omgaan met Nee",
    category: "mindset",
    description: "Wat doe je als iemand 'nee' zegt?",
    steps: [
      "Vraag iets aan 5 mensen (vraag om hulp, verkoop iets)",
      "Noteer hoeveel 'ja' en 'nee' je krijgt",
      "Vraag bij elke 'nee': waarom niet?",
      "Deel wat je geleerd hebt in de video"
    ],
    xpReward: 120,
    skill: "Doorzettingsvermogen",
    tips: "Elke 'nee' brengt je dichter bij een 'ja'",
    masterChallenge: "Houd data bij van 10 vragen: bij welke formulering kreeg je vaker 'ja'? Vorm een hypothese en test die op 5 nieuwe mensen."
  },
  {
    week: 21,
    title: "Canva Master",
    category: "skills",
    description: "Leer professionele graphics maken",
    steps: [
      "Maak een gratis Canva account",
      "Maak een poster voor je product/dienst",
      "Maak een YouTube thumbnail",
      "Laat je designs zien in de video"
    ],
    xpReward: 130,
    skill: "Design",
    tips: "Goed design = simpel, duidelijk, opvallend",
    masterChallenge: "Ontwerp 2 versies van dezelfde poster en laat 10 mensen kiezen. Welk ontwerp wint, en kun je verklaren waarom?"
  },
  {
    week: 22,
    title: "De Magie van Rente",
    category: "geld",
    description: "Begrijp hoe geld kan groeien",
    steps: [
      "Leer wat 'rente op rente' betekent",
      "Bereken: €100 met 10% rente, na 10 jaar?",
      "Maak een grafiek van de groei",
      "Leg compound interest uit in je video"
    ],
    xpReward: 140,
    skill: "Financiën",
    tips: "Einstein: 'Compound interest is het 8e wereldwonder'",
    masterChallenge: "Zoek de '72-regel' op en reken uit hoe lang geld erover doet om te verdubbelen bij 7%. Controleer die vuistregel daarna met een echte berekening."
  },
  {
    week: 23,
    title: "Mijn Netwerk",
    category: "skills",
    description: "Wie ken je die je kan helpen?",
    steps: [
      "Maak een lijst van 20 mensen die je kent",
      "Schrijf bij elk persoon: hoe kan deze persoon mij helpen?",
      "Kies 3 mensen om beter te leren kennen",
      "Vertel in de video waarom je netwerk belangrijk is"
    ],
    xpReward: 100,
    skill: "Netwerken",
    tips: "Je netwerk = je netto waarde",
    masterChallenge: "Teken je netwerk als een kaart met lijnen. Wie verbindt jou met werelden die je zelf niet kent? Die 'bruggen' zijn goud waard."
  },
  {
    week: 24,
    title: "10 Side Hustle Ideeën",
    category: "actie",
    description: "Bedenk 10 manieren om iets te verdienen",
    steps: [
      "Brainstorm 10 verschillende manieren om geld te verdienen",
      "Beoordeel elk idee: makkelijk/moeilijk, leuk/niet leuk",
      "Kies je top 3",
      "Pitch je beste idee in de video"
    ],
    xpReward: 150,
    skill: "Creativiteit",
    tips: "Er zijn ALTIJD manieren om geld te verdienen - je moet ze alleen zien",
    masterChallenge: "Scoor je 10 ideeën op 3 assen (tijd, winst, plezier) in een tabel. Welk idee wint objectief — en durf je dat te kiezen, ook als het niet je favoriet is?"
  },
  {
    week: 25,
    title: "Feedback is een Cadeau",
    category: "mindset",
    description: "Leer feedback te vragen en te gebruiken",
    steps: [
      "Vraag 5 mensen: wat kan ik beter doen?",
      "Schrijf alle feedback op",
      "Kies 1 ding om te verbeteren",
      "Deel de feedback in je video"
    ],
    xpReward: 120,
    skill: "Groeien",
    tips: "De beste ondernemers VRAGEN om feedback",
    masterChallenge: "Vraag om je 'moeilijkste' feedback en bedank de gever oprecht. Schrijf op waarom juist die opmerking het meest waardevol was."
  },
  {
    week: 26,
    title: "Q2 Review",
    category: "review",
    description: "Halfjaar feest! 🎉",
    steps: [
      "Tel je totale XP en gespaard geld",
      "Schrijf je 3 grootste lessen van Q2",
      "Plan je zomerproject",
      "Maak een epische halfjaar-video!"
    ],
    xpReward: 200,
    skill: "Reflectie",
    tips: "Je bent halverwege! Dat is ENORM!",
    masterChallenge: "Stel jezelf een meetbaar zomer-doel met een deadline én een getal. Hoe weet je straks objectief of het gelukt is?"
  },

  // Q3: ONDERNEMEN (Week 27-39)
  {
    week: 27,
    title: "Mijn Zomerproject",
    category: "actie",
    description: "Ontwerp en run je eigen missie van A tot Z",
    steps: [
      "Kies zelf een doel dat je deze zomer wilt bereiken",
      "Verdeel het in stappen (zonder dat iemand je vertelt hoe)",
      "Voer je plan uit en houd bij wat er gebeurt",
      "Laat je zomerproject zien in de video"
    ],
    xpReward: 180,
    skill: "Zelfsturing",
    tips: "Dit is jouw missie - jij bent de baas van begin tot eind",
    masterChallenge: "Documenteer je zomerproject als een mini-onderneming: start, tegenslag, oplossing, resultaat — alsof je het aan een investeerder presenteert."
  },
  {
    week: 28,
    title: "Mijn Eerste Product Maken",
    category: "actie",
    description: "Verzin een product dat je zelf kunt maken en verkopen",
    steps: [
      "Bedenk 3 dingen die je kunt maken (snoep, sleutelhanger, tekening)",
      "Kies er één uit en maak er een prototype van",
      "Bepaal een prijs",
      "Laat je product zien in de video"
    ],
    xpReward: 150,
    skill: "Ondernemen",
    tips: "Begin klein. Eén verkocht product is een echte ondernemer.",
    masterChallenge: "Maak 3 prototypes en laat mensen ze testen. Verbeter je product op basis van wat er kapot ging of onduidelijk was."
  },
  {
    week: 29,
    title: "Klanten Vinden",
    category: "actie",
    description: "Leer hoe je mensen vindt die jouw product willen",
    steps: [
      "Schrijf op wie jouw product zou kopen",
      "Bedenk 3 manieren om die mensen te bereiken",
      "Vraag aan 3 mensen of ze het leuk vinden",
      "Vertel in de video wat je leerde"
    ],
    xpReward: 150,
    skill: "Verkoop",
    tips: "De beste klant is iemand van wie je een probleem oplost.",
    masterChallenge: "Beschrijf je 'ideale klant' in detail (leeftijd, wens, probleem) en zoek 3 plekken waar precies díe persoon te vinden is."
  },
  {
    week: 30,
    title: "Mijn Merk Bedenken",
    category: "skills",
    description: "Geef je onderneming een naam en een look",
    steps: [
      "Verzin een catchy naam voor je merk",
      "Kies 2 kleuren die bij je merk passen",
      "Teken een simpel logo",
      "Laat je merk zien in de video"
    ],
    xpReward: 150,
    skill: "Branding",
    tips: "Een sterk merk maakt mensen blij als ze het zien.",
    masterChallenge: "Ontwerp je merk zó dat het ook zónder naam herkenbaar is. Test: herkennen mensen jouw kleuren/logo tussen 5 andere?"
  },
  {
    week: 31,
    title: "De Kracht van Herhaling",
    category: "mindset",
    description: "Ontdek hoe kleine stappen elke dag groot worden",
    steps: [
      "Kies één vaardigheid om 10 min per dag te oefenen",
      "Doe dat 7 dagen achter elkaar",
      "Schrijf op wat er veranderde",
      "Deel je inzicht in de video"
    ],
    xpReward: 150,
    skill: "Discipline",
    tips: "Als je iets 66 dagen doet, wordt het een gewoonte.",
    masterChallenge: "Meet je vaardigheid op dag 1 en dag 7 met een getal (aantal, tijd of score). Bewijs met je data dat oefenen werkte."
  },
  {
    week: 32,
    title: "Investeren Begrijpen",
    category: "geld",
    description: "Leer wat investeren is en waarom het werkt",
    steps: [
      "Zoek uit wat 'rente' betekent",
      "Reken uit: €100 wordt €110 na 1 jaar bij 10%",
      "Bedenk waarom wachten loont",
      "Leg het uit in de video"
    ],
    xpReward: 160,
    skill: "Beleggen",
    tips: "Tijd is de grootste vriend van je geld.",
    masterChallenge: "Simuleer 3 nep-investeringen (spaarrekening, aandeel, eigen bedrijf) en voorspel welke na 10 jaar wint. Onderbouw met een berekening én het risico."
  },
  {
    week: 33,
    title: "Mijn Verkooppraatje",
    category: "skills",
    description: "Oefen hoe je enthousiast over je product praat",
    steps: [
      "Schrijf 3 zinnen waarom jouw product leuk is",
      "Oefen hardop voor de spiegel",
      "Houd je praatje in de video",
      "Vraag papa wat beter kan"
    ],
    xpReward: 150,
    skill: "Pitch",
    tips: "Geloof je er zelf in, dan gelooft de koper het ook.",
    masterChallenge: "Neem je pitch 2x op: één keer 'saai', één keer 'enthousiast'. Laat mensen raden welke echt is en analyseer wat energie met een boodschap doet."
  },
  {
    week: 34,
    title: "Samenwerken",
    category: "actie",
    description: "Werk samen met iemand aan een project",
    steps: [
      "Vraag een vriend of familielid mee te doen",
      "Verdeel 2 taken",
      "Maak samen iets af",
      "Vertel in de video hoe samenwerken voelde"
    ],
    xpReward: 160,
    skill: "Teamwork",
    tips: "Twee breinen verzinnen meer dan één.",
    masterChallenge: "Verdeel de taken op basis van elkaars sterke punten in plaats van 50/50. Werd het resultaat beter? Waarom wel of niet?"
  },
  {
    week: 35,
    title: "Mijn Geld-dagboek",
    category: "geld",
    description: "Houd een week lang bij waar je geld naartoe gaat",
    steps: [
      "Schrijf 7 dagen op wat je uitgeeft",
      "Tel op wat er weg was aan snoep",
      "Bedenk 1 ding om te minderen",
      "Deel je inzicht in de video"
    ],
    xpReward: 150,
    skill: "Inzicht",
    tips: "Weten waar geld naartoe gaat is de eerste stap naar rijkdom.",
    masterChallenge: "Zoek je grootste 'geld-lek' van de week en bedenk een systeem (géén wilskracht!) dat het automatisch vermindert."
  },
  {
    week: 36,
    title: "Een Fail Flikken",
    category: "mindset",
    description: "Doe expres iets wat kan mislukken en leer ervan",
    steps: [
      "Kies iets waarvan je denkt dat het mislukt",
      "Probeer het toch",
      "Schrijf op wat je leerde",
      "Lach erom in de video"
    ],
    xpReward: 160,
    skill: "Veerkracht",
    tips: "Elke uitvinder is honderd keer mislukt. Falen = leren.",
    masterChallenge: "Ontwerp een experiment waarvan de uitkomst écht onzeker is. Voorspel vooraf, voer uit, en vergelijk: verraste de werkelijkheid je?"
  },
  {
    week: 37,
    title: "Mijn Website Bouwen",
    category: "skills",
    description: "Maak een simpele pagina over je merk",
    steps: [
      "Kies een tool (Canva, Google Sites, of vraag papa)",
      "Zet je logo en 1 product erop",
      "Voeg een 'koop hier' knop toe",
      "Laat je site zien in de video"
    ],
    xpReward: 170,
    skill: "Bouwen",
    tips: "Een website is je winkel die nooit slaapt.",
    masterChallenge: "Voeg één slimme functie toe die je site 'levend' maakt (een knop die iets doet, of een formulier). Leg uit welk probleem het oplost."
  },
  {
    week: 38,
    title: "Diensten Verkopen",
    category: "actie",
    description: "Verkoop een hulp-dienst in plaats van een product",
    steps: [
      "Bedenk 3 diensten (klusjes, hond uitlaten, tuin)",
      "Kies er één",
      "Bied hem aan aan 2 buren",
      "Vertel in de video hoe het ging"
    ],
    xpReward: 170,
    skill: "Service",
    tips: "Een dienst kost geen inkoop — pure winst.",
    masterChallenge: "Bereken je uurtarief: wat is jouw tijd waard? Onderhandel bewust over de prijs en noteer welke aanpak werkte."
  },
  {
    week: 39,
    title: "Kwartaal 3 Terugblik",
    category: "review",
    description: "Kijk terug op alles wat je dit kwartaal deed",
    steps: [
      "Tel je totale XP van dit kwartaal",
      "Kies je favoriete missie",
      "Bedenk waar je trots op bent",
      "Maak een epische terugblik-video!"
    ],
    xpReward: 200,
    skill: "Reflectie",
    tips: "Drie kwartalen gedaan. Jij bent een machine.",
    masterChallenge: "Maak een grafiek van je XP-groei over 3 kwartalen. Waar zit de steilste lijn, en welke gewoonte veroorzaakte die groei?"
  },

  // Q4: SCHALEN & VIEREN (Week 40-52)
  {
    week: 40,
    title: "Mijn Prijs Strategie",
    category: "geld",
    description: "Leer dat prijs invloed heeft op wie koopt",
    steps: [
      "Zet je product op 3 prijzen naast elkaar",
      "Bedenk bij welke prijs jij het meeste verdient",
      "Vraag 5 mensen welke ze kiezen",
      "Leg je keuze uit in de video"
    ],
    xpReward: 170,
    skill: "Pricing",
    tips: "Te goedkoop = mensen denken dat het waardeloos is.",
    masterChallenge: "Test 3 prijzen bij echte mensen (of een enquête) en teken de 'vraag-curve': bij welke prijs verdien je in totaal het meest?"
  },
  {
    week: 41,
    title: "Een Tweede Inkomen",
    category: "actie",
    description: "Zorg dat je iets verdient terwijl je slaapt",
    steps: [
      "Zet iets te koop dat automatisch loopt",
      "Of: leen geld uit aan je spaarpot met rente",
      "Check na een week wat er binnenkwam",
      "Deel het in de video"
    ],
    xpReward: 180,
    skill: "Passief",
    tips: "Rijke mensen hebben geld dat voor ze werkt.",
    masterChallenge: "Bedenk één ding dat geld oplevert terwijl je slaapt en reken uit hoeveel 'passief' inkomen je daarmee na een jaar zou hebben."
  },
  {
    week: 42,
    title: "Geven aan Anderen",
    category: "mindset",
    description: "Ontdek de kracht van weggeven",
    steps: [
      "Kies iets wat je kunt missen",
      "Geef het aan iemand die het nodig heeft",
      "Kijk hoe het voelt",
      "Vertel in de video waarom geven rijk maakt"
    ],
    xpReward: 170,
    skill: "Vrijgevigheid",
    tips: "De hand die geeft, wordt altijd terug gevuld.",
    masterChallenge: "Geef anoniem iets weg en let op je eigen gevoel. Schrijf op waarom geven zónder krediet anders voelt dan geven mét dank."
  },
  {
    week: 43,
    title: "Mijn Grote Doel",
    category: "mindset",
    description: "Stel een doel voor het komende jaar",
    steps: [
      "Schrijf 1 enorm doel op",
      "Maak 3 kleine stappen er naartoe",
      "Hang het naast je vision board",
      "Vertel het in de video"
    ],
    xpReward: 180,
    skill: "Doelen",
    tips: "Een doel zonder datum is een wens. Geef het een datum.",
    masterChallenge: "Formuleer een doel dat je nu nog 'onmogelijk' vindt en breek het terug tot de allereerste stap die je deze week al kunt zetten."
  },
  {
    week: 44,
    title: "Onderhandelen",
    category: "skills",
    description: "Leer onderhandelen over prijs en afspraken",
    steps: [
      "Bedenk iets waar je om kunt vragen",
      "Oefen 'Nee, maar dan wel...'",
      "Onderhandel met papa over iets kleins",
      "Laat je truc zien in de video"
    ],
    xpReward: 180,
    skill: "Onderhandelen",
    tips: "Alles is bespreekbaar. Je moet het alleen vragen.",
    masterChallenge: "Onderhandel een echte deal (zakgeld, bedtijd, klus) met een voorstel dat óók goed is voor de ander. Win-win of niets."
  },
  {
    week: 45,
    title: "Mijn Klantenlijst",
    category: "actie",
    description: "Bouw een lijst met mensen die bij je kopen",
    steps: [
      "Schrijf de namen op van wie al kocht",
      "Vraag ze om nog een keer te kopen",
      "Bied iets speciaals aan",
      "Deel je lijst in de video"
    ],
    xpReward: 180,
    skill: "Klantrelaties",
    tips: "Een trouwe klant is 10x meer waard dan 1 nieuwe.",
    masterChallenge: "Reken uit hoeveel 3 terugkerende klanten opleveren t.o.v. 1 nieuwe, en verklaar waarom een trouwe klant zoveel waardevoller is."
  },
  {
    week: 46,
    title: "Schaal het Op",
    category: "geld",
    description: "Bedenk hoe je meer verkoopt zonder meer werk",
    steps: [
      "Kies 1 product om in bulk te maken",
      "Maak er 5 tegelijk",
      "Verkoop ze aan verschillende mensen",
      "Vertel in de video wat er gebeurde"
    ],
    xpReward: 190,
    skill: "Opschalen",
    tips: "Doen wat werkt, maar dan 10x — dat is schalen.",
    masterChallenge: "Vind de stap in je proces die het langst duurt (de 'bottleneck') en bedenk hoe je die 2x sneller maakt zonder kwaliteit te verliezen."
  },
  {
    week: 47,
    title: "Mijn Verhaal",
    category: "skills",
    description: "Vertel wie je bent en waar je voor staat",
    steps: [
      "Schrijf 3 zinnen over jezelf",
      "Waarom doe je dit avontuur?",
      "Oefen je verhaal",
      "Houd het in de video"
    ],
    xpReward: 180,
    skill: "Storytelling",
    tips: "Mensen kopen van mensen die ze kennen en vertrouwen.",
    masterChallenge: "Schrijf je verhaal in 3 zinnen zó dat een vreemde het onthoudt. Test of iemand het een dag later kan navertellen."
  },
  {
    week: 48,
    title: "Gewoontes van Succesvolle Mensen",
    category: "mindset",
    description: "Leer 3 gewoontes van succesvolle mensen",
    steps: [
      "Zoek 3 gewoontes (vroeg op, lezen, sport)",
      "Kies er één om 1 week te doen",
      "Schrijf op wat het bracht",
      "Deel het in de video"
    ],
    xpReward: 190,
    skill: "Gewoontes",
    tips: "Je wordt wie je elke dag bent.",
    masterChallenge: "Bouw een 'gewoonte-stapel': koppel een nieuwe gewoonte aan iets dat je al dagelijks doet. Meet 7 dagen of het blijft plakken."
  },
  {
    week: 49,
    title: "Mijn Meesterplan",
    category: "actie",
    description: "Maak een plan voor de laatste sprint",
    steps: [
      "Kies 3 dingen die je nog wil afmaken",
      "Zet ze op een tijdlijn",
      "Begin vandaag met de eerste",
      "Laat je plan zien in de video"
    ],
    xpReward: 190,
    skill: "Planning",
    tips: "Een plan op papier is een droom met een deadline.",
    masterChallenge: "Zet je 3 doelen op een tijdlijn met deadlines én bedenk vooraf wat er mis kán gaan (een 'plan B' per doel)."
  },
  {
    week: 50,
    title: "De Kompas Check",
    category: "review",
    description: "Check hoe ver je gereisd bent op je eigen kompas",
    steps: [
      "Tel je totale XP",
      "Zie welk voertuig je nu hebt",
      "Bedenk de laatste stappen naar je grote doel",
      "Maak een video van je reis tot nu toe"
    ],
    xpReward: 200,
    skill: "Reflectie",
    tips: "Je bent niet meer de skateboarder van week 1.",
    masterChallenge: "Vergelijk de 'jij van week 1' met nu: schrijf een brief aan je oude zelf met de 3 belangrijkste dingen die je hebt geleerd."
  },
  {
    week: 51,
    title: "Vieren & Delen",
    category: "mindset",
    description: "Vier wat je bereikt hebt en deel het",
    steps: [
      "Kies 1 ding waar je het trotst op bent",
      "Deel je verhaal met iemand",
      "Trakteer jezelf op iets kleins",
      "Vier het in de video"
    ],
    xpReward: 190,
    skill: "Trots",
    tips: "Vieren is belangrijk. Je hebt keihard gewerkt.",
    masterChallenge: "Deel je reis publiekelijk (video of verhaal) en let op de reacties. Wat inspireerde anderen het meest aan jouw verhaal?"
  },
  {
    week: 52,
    title: "Mijn Ikigai Mindset",
    category: "review",
    description: "Sluit het jaar af als iemand die zijn kompas gevonden heeft",
    steps: [
      "Schrijf op wat je nu anders doet dan in week 1",
      "Stel je doel voor volgend jaar",
      "Bedank papa in de video",
      "Maak je allerbeste eindvideo!"
    ],
    xpReward: 250,
    skill: "Meesterschap",
    tips: "Je kompas begint niet bij geld. Het begint bij wie je bent geworden.",
    masterChallenge: "Schrijf je eigen 'jaar 2'-programma: bedenk 5 missies die jóu volgend jaar het meest zouden laten groeien. Jij bent nu de ontwerper."
  }
];

// Ikigai-pijlers: de vier windrichtingen van je kompas (+ 'kompas' voor reviews).
export const IKIGAI = {
  hart:   { key: 'hart',   label: 'Waar je van houdt',        emoji: '❤️',  badge: 'bg-purple-500/30 text-purple-200' },
  talent: { key: 'talent', label: 'Waar je goed in wordt',    emoji: '🛠️',  badge: 'bg-blue-500/30 text-blue-200' },
  wereld: { key: 'wereld', label: 'Wat de wereld nodig heeft', emoji: '🌍',  badge: 'bg-orange-500/30 text-orange-200' },
  waarde: { key: 'waarde', label: 'Waar je voor beloond wordt', emoji: '💶', badge: 'bg-emerald-500/30 text-emerald-200' },
  kompas: { key: 'kompas', label: 'Je kompas',                emoji: '🧭',  badge: 'bg-amber-500/30 text-amber-200' },
};

const CATEGORY_TO_IKIGAI = {
  mindset: 'hart',
  skills: 'talent',
  actie: 'wereld',
  geld: 'waarde',
  review: 'kompas',
};

// Resolve the Ikigai pillar for a mission (via its category).
export const getIkigai = (category) => IKIGAI[CATEGORY_TO_IKIGAI[category]] || IKIGAI.kompas;

// Get mission by week
export const getMissionByWeek = (week) => {
  return MISSIONS.find(m => m.week === week);
};

// Get missions by category
export const getMissionsByCategory = (category) => {
  return MISSIONS.filter(m => m.category === category);
};

// Get category color class
export const getCategoryColor = (category) => {
  const colors = {
    mindset: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20', badge: 'badge-mindset' },
    geld: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/20', badge: 'badge-geld' },
    skills: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20', badge: 'badge-skills' },
    actie: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/20', badge: 'badge-actie' },
    review: { bg: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/20', badge: 'bg-amber-500/30 text-amber-300' }
  };
  return colors[category] || colors.mindset;
};
