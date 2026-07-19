// ☀️ Zomer-editie — 4 losstaande zomeravonturen (bonus, tellen NIET mee in de
// 52-week teller). Elk avontuur heeft een aantal leuke, checkbare stappen voor
// een kind van ~10 jaar, plus een Meester-uitdaging en een Boost. Alle stappen
// zijn lokaal aan te vinken en geven XP (ook zonder wifi).
//
// `steps` = de verplichte acties om de challenge "klaar" te krijgen (en XP te
// claimen). `masterChallenge` en `boost` zijn extra (geen aparte checkbox, wel
// een eigen XP-boost via claimSummerXP met de volledige xpReward).

export const SUMMER_CHALLENGES = [
  {
    id: 'zomer-1',
    emoji: '🏝️',
    week: 'Zomerweek 1',
    dateRange: '15–21 juli',
    title: 'Zomer-Onderneming',
    ikigai: ['waarde', 'wereld'],
    intro:
      'Start deze week een ÉCHTE mini-onderneming. Geen gewone limonadekraam — bedenk wélk probleem je oplost (dorst bij warm weer, verveelde buurkinderen, rommelige garages).',
    xpReward: 250,
    steps: [
      'Ik heb bedacht WAT ik verkoop en VOOR WIE (mijn idee staat opgeschreven)',
      'Ik heb mijn spulletjes gemaakt of verzameld (het product is klaar)',
      'Ik heb een prijs bedacht en mijn "winkel" opgezet (tafel/plek/karwei)',
      'Ik heb aan minstens 3 mensen verkocht 💶',
      'Ik heb mijn omzet geteld en weet wat ik verdiend heb',
    ],
    masterChallenge:
      'Houd een "kasboek" bij (inkoop, omzet, winst). Reken je winst per uur uit en bedenk één verandering die je omzet zou verdubbelen — en test die ook echt.',
    boost: 'Verkoop op 2 verschillende dagen en vergelijk: welke dag/plek/tijd werkte beter, en waarom?',
    boostXp: 250,
  },
  {
    id: 'zomer-2',
    emoji: '🔭',
    week: 'Zomerweek 2',
    dateRange: '22–28 juli',
    title: 'Ontdekkingsreiziger',
    ikigai: ['talent', 'hart'],
    intro:
      'Leer in 7 dagen iets compleet nieuws dat je nog nooit deed: jongleren, een goocheltruc, een liedje op een instrument, koken zonder recept, woorden van een nieuwe taal.',
    xpReward: 200,
    steps: [
      'Ik heb gekozen WAT ik deze week ga leren',
      'Ik heb elke dag minstens 15 minuutjes geoefend (7 dagen!)',
      'Ik kan het nu béter dan op dag 1 (ik merk verschil)',
      'Ik heb het aan iemand laten zien 🎬',
      'Ik heb opgeschreven: wat was het moeilijkst en wat deed ik toen ik vastliep?',
    ],
    masterChallenge:
      'Film jezelf op dag 1 én dag 7 en maak een "leercurve"-video. Beschrijf: waar zat het moeilijkste punt, en wat deed je toen je vastliep?',
    boost: 'Leer het daarna in 10 minuten aan iemand anders. Kun jij een goede leraar zijn?',
    boostXp: 200,
  },
  {
    id: 'zomer-3',
    emoji: '🛠️',
    week: 'Zomerweek 3',
    dateRange: '29 juli–4 aug',
    title: 'Maker Week',
    ikigai: ['talent', 'wereld'],
    intro:
      'Bouw of maak deze week één echt "ding" af — van idee tot klaar. Een zelfgemaakt spel, een stripverhaal, een gadget van karton/lego, een korte YouTube-serie of een AI-avonturenverhaal.',
    xpReward: 250,
    steps: [
      'Ik heb mijn project bedacht en een simpel plan(etje) gemaakt',
      'Ik ben begonnen en heb elke dag een stukje gedaan',
      'Mijn maaksel is deze week écht AF (niet half) ✅',
      'Ik heb 3 mensen mijn maaksel laten testen',
      'Ik heb 1 ding verbeterd na hun feedback (versie 2!)',
    ],
    masterChallenge:
      'Laat 3 mensen je maaksel testen, verzamel hun feedback, en maak versie 2 die beter is. Schrijf op wat je veranderde en waarom.',
    boost: 'Bedenk hoe je er 5 zou kunnen maken zonder 5x zo lang bezig te zijn (slimmer werken = schalen).',
    boostXp: 250,
  },
  {
    id: 'zomer-4',
    emoji: '💛',
    week: 'Zomerweek 4',
    dateRange: '5–11 aug',
    title: 'Geef Iets Terug + Terugblik',
    ikigai: ['wereld', 'kompas'],
    intro:
      'Doe deze week iets goeds voor een ander of voor de natuur, zónder er iets voor terug te vragen — en blik terug op je hele zomer.',
    xpReward: 300,
    steps: [
      'Ik heb gekozen WAT ik ga doen voor een ander of de natuur',
      'Ik heb de goede daad écht uitgevoerd 💛',
      'Ik heb 2-3 vrienden meegekregen om óók mee te doen',
      'Ik heb mijn leukste zomer-moment opgeschreven',
      'Ik heb een korte "zomer-film" gemaakt van mijn 4 avonturen',
    ],
    masterChallenge:
      'Bedenk een actie die anderen aanzet om óók mee te doen (waar 2-3 vrienden aan meehelpen). Wat gebeurde er toen je anderen meekreeg?',
    boost: 'Maak een korte "zomer-film" van je 4 avonturen. Welke week paste het beste bij jouw Ikigai?',
    boostXp: 300,
  },
];

// Hulpfunctie: totaal aantal stappen van een challenge.
export const getSummerStepCount = (challenge) => challenge.steps?.length || 0;
