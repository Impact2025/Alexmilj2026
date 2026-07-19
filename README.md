# 🏎️ Reis naar het Miljoen

Een vader-zoon avontuur app voor de reis naar het eerste miljoen. Gebouwd met React, Vite, Tailwind CSS, Neon Database en Clerk Authentication.

![Reis naar het Miljoen](https://img.shields.io/badge/versie-2.0.0-amber)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)
![Neon](https://img.shields.io/badge/Neon-Postgres-green)
![Clerk](https://img.shields.io/badge/Clerk-Auth-purple)

## 🚀 Snel Starten

### Vereisten
- Node.js 18+ geïnstalleerd
- npm of yarn
- **Neon Database account** (gratis tier beschikbaar op [console.neon.tech](https://console.neon.tech))
- **Clerk account** (gratis tier beschikbaar op [dashboard.clerk.com](https://dashboard.clerk.com))

### Installatie

**Voor volledige setup instructies, zie [SETUP.md](./SETUP.md)**

Snelle start:

```bash
# 1. Installeer dependencies
npm install

# 2. Configureer environment variabelen in .env.local
# DATABASE_URL=your_neon_connection_string
# VITE_DATABASE_URL=your_neon_connection_string
# VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# 3. Push database schema naar Neon
npm run db:push

# 4. Start de development server
npm run dev

# 5. Open http://localhost:5173 in je browser
```

## 📁 Project Structuur

```
reis-naar-het-miljoen/
├── public/
│   └── lambo.svg          # Favicon
├── src/
│   ├── components/        # Herbruikbare componenten
│   │   ├── Layout.jsx     # Hoofdlayout met navigatie
│   │   ├── AuthButton.jsx # Clerk authenticatie button
│   │   ├── SyncIndicator.jsx # Cloud/Local sync indicator
│   │   ├── MorningRitual.jsx
│   │   ├── MissionPreview.jsx
│   │   ├── StatsCard.jsx
│   │   └── VehicleCard.jsx
│   ├── context/
│   │   └── AppContext.jsx # State management + Auth + DB
│   ├── db/
│   │   ├── schema.js      # Database schema (Drizzle ORM)
│   │   └── index.js       # Database connection
│   ├── services/          # Database services
│   │   ├── userService.js
│   │   └── missionService.js
│   ├── hooks/
│   │   └── useDatabase.js # Database operations hook
│   ├── data/
│   │   ├── missions.js    # 52 wekelijkse missies
│   │   ├── quotes.js      # Mindset quotes
│   │   └── vehicles.js    # Voertuig progressie
│   ├── pages/
│   │   ├── Dashboard.jsx  # Hoofdpagina
│   │   ├── Missions.jsx   # Alle missies
│   │   ├── Journey.jsx    # Voertuig reis
│   │   ├── SundayReview.jsx # Zondag video
│   │   └── Settings.jsx   # Instellingen
│   ├── styles/
│   │   └── index.css      # Tailwind + custom CSS
│   ├── App.jsx            # Routes
│   └── main.jsx           # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## ✨ Wereldklasse Features

### 🔐 **Authenticatie & Cloud Sync**
- **Clerk Authentication**: Veilige gebruiker authenticatie met email/social login
- **Hybrid Storage**: Werkt zowel met cloud database als lokaal (offline-first)
- **Real-time Sync**: Alle voortgang wordt automatisch gesynchroniseerd
- **Multi-device**: Inloggen op meerdere apparaten met dezelfde voortgang

### 💾 **Neon Postgres Database**
- **Serverless**: Schaalbaar en kostenefficiënt
- **Type-safe**: Drizzle ORM voor type-veilige database queries
- **Migrations**: Eenvoudig schema updates met Drizzle Kit
- **Studio**: Visueel database management met `npm run db:studio`

### 📊 **Data Tracking**
- Alle missies en XP in database opgeslagen
- Dagelijkse logs voor progressie tracking
- Zondag review video's met URLs en notities
- Badge systeem voor prestaties
- Geld tracking (gespaard & verdiend)

## 🎮 Features

### ✅ Ochtendritueel
- Dagelijkse mindset quote
- Focus voor de dag instellen
- Streak teller
- +25 XP per dag

### 🎯 Wekelijkse Missies
- 52 uitgewerkte missies voor heel 2026
- Categorieën: Mindset, Geld, Skills, Actie
- XP beloningen per missie
- Tips en stap-voor-stap instructies

### 🚗 Voertuig Progressie
- Van Skateboard naar Lamborghini
- 6 levels te unlocken
- Visuele progressie
- XP-gebaseerd systeem

### 🎬 Zondag Review
- Video opname vragen
- Week samenvatting
- Tips voor goede video's
- +75 XP voor video upload

### ⚙️ Instellingen
- Naam aanpassen
- Gespaard/verdiend geld bijhouden
- Statistieken overzicht
- Data reset optie

## 🛠 Aanpassen

### Nieuwe missies toevoegen
Bewerk `src/data/missions.js`:

```javascript
{
  week: 53,
  title: "Jouw Nieuwe Missie",
  category: "mindset", // mindset, geld, skills, actie
  description: "Beschrijving van de missie",
  steps: [
    "Stap 1",
    "Stap 2",
    "Stap 3"
  ],
  xpReward: 150,
  skill: "Nieuwe Skill",
  tips: "Handige tip voor deze missie"
}
```

### Quotes toevoegen
Bewerk `src/data/quotes.js`:

```javascript
{
  quote: "Jouw inspirerende quote",
  author: "Naam Auteur",
  category: "motivatie"
}
```

### Voertuigen aanpassen
Bewerk `src/data/vehicles.js`:

```javascript
{
  id: 7,
  name: "Nieuw Voertuig",
  emoji: "🚁",
  xpRequired: 200000,
  description: "Beschrijving",
  color: "from-purple-500 to-pink-500"
}
```

## 🎨 Styling Aanpassen

De app gebruikt Tailwind CSS. Belangrijke kleuren in `tailwind.config.js`:

- `lambo-*`: Gouden/amber tinten (hoofdkleur)
- `dark-*`: Donkere achtergrond tinten

Custom CSS classes in `src/styles/index.css`:
- `.glass-card`: Glazen kaart effect
- `.btn-primary`: Primaire knop
- `.vehicle-bounce`: Bouncing animatie

## 🏗️ Technische Architectuur

```
┌─────────────────────────────────────────────┐
│         Frontend (React + Vite)             │
│  ┌──────────────────────────────────────┐   │
│  │  Components + Pages                  │   │
│  │  ├─ Dashboard, Missions, Journey     │   │
│  │  ├─ AuthButton, SyncIndicator        │   │
│  │  └─ Layout, Cards, etc.              │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  AppContext (State Management)       │   │
│  │  ├─ User state                       │   │
│  │  ├─ Auth integration (Clerk)         │   │
│  │  └─ Database sync                    │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  Services Layer                      │   │
│  │  ├─ userService.js                   │   │
│  │  └─ missionService.js                │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  Drizzle ORM (Type-safe queries)     │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│      Clerk Authentication (Cloud)           │
│  • User management                          │
│  • Session handling                         │
│  • Social logins                            │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│      Neon Postgres Database (Cloud)         │
│  Tables:                                    │
│  • users                                    │
│  • completed_missions                       │
│  • badges                                   │
│  • daily_logs                               │
│  • sunday_reviews                           │
│  • weekly_goals                             │
└─────────────────────────────────────────────┘
```

### Waarom Deze Stack?

**React + Vite**: Snelle development en build times
**Tailwind CSS**: Rapid UI development met utility classes
**Clerk**: Best-in-class authenticatie, makkelijk te integreren
**Neon**: Serverless Postgres, gratis tier, auto-scaling
**Drizzle ORM**: Type-safe, moderne ORM voor TypeScript/JavaScript
**Vercel**: Zero-config deployment, perfect voor Vite apps

## 📱 Responsive Design

De app is volledig responsive:
- Desktop: Volledige layout met sidebar stats
- Tablet: Aangepaste grid
- Mobiel: Gestapelde layout, compacte navigatie

## 🚀 Deployen

### Vercel (Aanbevolen) ⭐

Vercel is perfect voor deze app omdat het:
- Automatisch Vite apps detecteert
- Gratis SSL certificates
- Automatische deployments via Git
- Environment variables ondersteuning

**Deployment Stappen:**

1. **Installeer Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Voeg Environment Variables toe** (in Vercel Dashboard):
   - `DATABASE_URL` - Je Neon database connection string
   - `VITE_DATABASE_URL` - Dezelfde Neon connection string
   - `VITE_CLERK_PUBLISHABLE_KEY` - Je Clerk publishable key

4. **Update Clerk Settings**:
   - Ga naar [Clerk Dashboard](https://dashboard.clerk.com)
   - Voeg je Vercel URL toe bij "Allowed domains"
   - Update de callback URLs met je productie URL

5. **Deploy to Production**:
```bash
vercel --prod
```

De app draait nu op: `https://your-app.vercel.app` 🎉

### Andere Platforms

#### Netlify
```bash
npm run build
# Upload dist folder naar Netlify
# Voeg environment variables toe in Netlify dashboard
```

#### Railway / Render
- Werkt out-of-the-box met Neon database
- Voeg dezelfde environment variables toe
- Deploy direct vanuit GitHub

## 📱 Progressive Web App (PWA) — werk ook zonder wifi 🚗

De app is een volwaardige PWA. Je kunt 'm op het startscherm zetten en in de auto
(of waar dan ook zonder internet) gewoon gebruiken.

### Wat er gebeurt er offline?
- De hele app (HTML/JS/CSS + iconen + fonts) wordt één keer geladen en daarna
  **geprecached** door een service worker (`dist/sw.js`). Zonder wifi laadt de app
  direct uit die cache.
- De data (XP, missies, zomer-challenge voortgang) staat al in `localStorage`
  ("local mode") — dus ook je voortgang blijft beschikbaar.
- Er is een **"🚗 Speel offline"** knop op het inlogscherm: tik die aan en je
  bent meteen binnen, zónder wachtwoord of server. Alles wordt lokaal bewaard en
  later (met wifi) gesynced naar de cloud.

### Installeren (kind kan dit zelf)
1. Open de app in de telefoonbrowser (Safari/Chrome).
2. Deel-icoontje → **"Zet op beginscherm"** (of "Installeer app").
3. Klaar — de app opent nu als eigen icoontje, volledig scherm, zonder adresbalk.

### Technisch
- `vite-plugin-pwa` genereert de service worker + precache automatisch bij `npm run build`.
- `public/manifest.webmanifest` bevat naam, iconen en `display: standalone`.
- `public/offline.html` is de fallback-pagina mocht een navigatie écht mislukken.
- Iconen worden gegenereerd via `scripts/gen-icons.py` (PIL).

## 🌞 Zomer-editie (interactief)

4 bonus-zomeravonturen op het dashboard, speciaal voor een kind van ~10:
- **Zomer-Onderneming**, **Ontdekkingsreiziger**, **Maker Week**, **Geef Iets Terug**.
- Elke challenge heeft **checkbare stappen**, een notitieveld, een voortgangsbar
  en een **Meester-uitdaging** + **Boost** (extra XP).
- Vink alle stappen aan en claim de XP (ook offline). Voortgang staat lokaal
  in `summer-progress` (localStorage).

## 📝 Volgende Stappen

1. [x] Neon database integratie ✅
2. [x] Clerk authenticatie ✅
3. [x] Cloud sync ✅
4. [x] Deployment configuratie ✅
5. [x] Progressive Web App (PWA) features ✅
6. [x] Zomer-challenge interactief + offline ✅
7. [ ] Push notificaties voor ochtendritueel
8. [ ] Ouder dashboard (analytics, overzicht kind's voortgang)
9. [ ] YouTube integratie voor video uploads
10. [ ] Gamification uitbreiden (leaderboards, challenges)
11. [ ] Week 27-52 missies verfijnen

## ❤️ Credits

Gemaakt met liefde door Papa & Zoon

Geïnspireerd door:
- Michael Pilarczyk - Master Your Mindset
- Napoleon Hill - Think and Grow Rich
- De Rijkste Man van Babylon

---

**Veel succes met de reis naar het miljoen! 🏎️💨**
