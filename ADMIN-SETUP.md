# 🔐 Admin Setup & Wachtwoorden

## Wachtwoorden

### Voor Zoon (User Account)
```
Wachtwoord: zoon2024
```
- Toegang tot: Dashboard, Missies, Reis, Zondag, Instellingen
- Kan: Ochtendritueel voltooien, missies voltooien, voortgang bekijken

### Voor Papa (Admin Account)
```
Wachtwoord: papa2024
```
- Toegang tot: Alles wat zoon heeft + **Admin Dashboard**
- Kan:
  - Alle activiteiten volgen
  - Sunday reviews bekijken en beoordelen
  - Feedback geven met sterren (1-5)
  - Custom missies aanmaken
  - Voortgang statistieken bekijken
  - Activity log met tijdstempels

## 🚀 Eerste Keer Inloggen

1. Open **http://localhost:4001**
2. Je ziet het wachtwoord scherm (🏎️ + loginvorm)
3. Voer wachtwoord in:
   - `zoon2024` voor normale toegang
   - `papa2024` voor admin toegang
4. Klik "Inloggen"

De wachtwoorden worden opgeslagen in je browser (sessionStorage), dus je hoeft niet elke keer opnieuw in te loggen tijdens dezelfde sessie.

## 🎯 Admin Dashboard Features

### Tab 1: Overzicht
- **Quick Stats**: Totale XP, Streak, Voltooide missies, Gespaarde geld, Verdiend geld
- **Recente Voortgang**: Laatste ochtendritueel, aantal voltooide missies, lid sinds datum
- **Progress Bar**: Visuele voortgangsbalk voor voltooide missies (van 52)

### Tab 2: Activiteit
- **Activity Log**: Chronologische lijst van:
  - Voltooide missies (met week nummer)
  - Ochtendrituelen (met focus tekst)
  - Datum en tijd
  - XP verdiend per activiteit
- Werkt zowel met cloud (Neon database) als local mode

### Tab 3: Reviews
- **Sunday Review Lijst**: Alle ingediende video's per week
- **Video Bekijken**: Klik op een review om:
  - YouTube video te bekijken (embedded)
  - Notities te lezen
  - Rating te geven (1-5 sterren)
  - Feedback te schrijven
  - Opslaan naar database
- **Status**: Zie of een review al beoordeeld is (groen vinkje)

### Tab 4: Missies
- **Custom Missie Aanmaken**:
  - Titel invoeren
  - Beschrijving schrijven
  - XP beloning instellen (0-1000)
  - Categorie kiezen (Mindset/Geld/Skills/Actie)
  - Optionele deadline
- **Voortgang Stats**:
  - Totaal voltooide missies
  - Voortgang per categorie (~25% elk)
  - Pro tips

## 🔒 Uitloggen

1. Klik op de **Admin** of **User** knop rechts bovenin
2. Klik op "Uitloggen"
3. Bevestig

Je wordt uitgelogd en terug naar het wachtwoord scherm gebracht.

## 🔄 Wachtwoorden Wijzigen

**BELANGRIJK**: De wachtwoorden staan hardcoded in de app voor simpliciteit.

### Voor Development (localhost):
Bewerk `src/components/PasswordGate.jsx`:
```javascript
const PASSWORDS = {
  admin: 'nieuw_papa_wachtwoord',  // Wijzig hier
  user: 'nieuw_zoon_wachtwoord'    // Wijzig hier
};
```

### Voor Production (Vercel):
**Optie 1**: Environment Variables (aangeraden)
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Voeg toe:
   - `VITE_ADMIN_PASSWORD` = jouw_admin_wachtwoord
   - `VITE_USER_PASSWORD` = jouw_user_wachtwoord
3. Update `PasswordGate.jsx` om deze te gebruiken:
```javascript
const PASSWORDS = {
  admin: import.meta.env.VITE_ADMIN_PASSWORD || 'papa2024',
  user: import.meta.env.VITE_USER_PASSWORD || 'zoon2024'
};
```
4. Redeploy de app

**Optie 2**: Hardcoded (simpel maar minder veilig)
- Commit de wijziging naar GitHub
- Vercel deployed automatisch

## 🎨 Design Verschillen

### User Badge (zoon2024)
- 🔵 **Blauw** shield icon
- Tekst: "User"
- Geen Admin tab in navigatie

### Admin Badge (papa2024)
- 🟡 **Goud** shield icon
- Tekst: "Admin"
- Extra **"Admin"** tab in navigatie (met shield icon)

## 📊 Database Schema Updates

De nieuwe admin features vereisen deze extra database velden:

### `sunday_reviews` table:
```sql
ALTER TABLE sunday_reviews ADD COLUMN submitted_at TIMESTAMP DEFAULT NOW();
ALTER TABLE sunday_reviews ADD COLUMN admin_feedback TEXT;
ALTER TABLE sunday_reviews ADD COLUMN admin_rating INTEGER;
ALTER TABLE sunday_reviews ADD COLUMN reviewed_at TIMESTAMP;
```

### Push naar Neon:
```bash
npm run db:push
```

Dit update het schema automatisch!

## 🐛 Troubleshooting

### "Invalid password"
- Controleer of je hoofdletters en kleine letters correct hebt
- Wachtwoorden zijn case-sensitive
- `zoon2024` en `Zoon2024` zijn verschillend!

### Zwart scherm na inloggen
- Check browser console (F12)
- Refresh de pagina (Ctrl+R)
- Clear sessionStorage: F12 → Application → Session Storage → Clear

### Admin tab niet zichtbaar
- Je bent ingelogd als **user** (`zoon2024`)
- Log uit en log in met **admin** wachtwoord (`papa2024`)

### Activity Log is leeg
- In **local mode**: Er is nog geen data
- In **cloud mode**: Check of database verbinding werkt
- Voer eerst een ochtendritueel of missie uit

### Reviews tab is leeg
- Nog geen Sunday reviews ingediend
- Sunday reviews worden gemaakt via "Zondag" pagina

## 🚀 Production Deployment

1. **Schema pushen**:
```bash
npm run db:push
```

2. **Environment Variables checken**:
- ✅ `DATABASE_URL`
- ✅ `VITE_DATABASE_URL`
- ✅ `VITE_CLERK_PUBLISHABLE_KEY`

3. **Deploy naar Vercel**:
```bash
git add .
git commit -m "Added admin dashboard with password gate"
git push
```

Vercel deployed automatisch!

4. **Testen**:
- Open je Vercel URL
- Test inloggen met beide wachtwoorden
- Test alle admin features

## 💡 Tips voor Papa

1. **Wekelijks Routine**:
   - Maandag: Check activity log voor vorige week
   - Zondag: Bekijk en beoordeel Sunday review
   - Geef altijd positieve + constructieve feedback

2. **Custom Missies**:
   - Gebruik voor speciale uitdagingen
   - Beloon extra effort met hogere XP
   - Maak een deadline voor urgentie

3. **Motivatie**:
   - Laat feedback niet te lang liggen (max 2 dagen)
   - Gebruik sterren: 3-4 is goed, 5 is exceptional
   - Schrijf specifieke feedback (niet alleen "goed gedaan!")

4. **Stats Tracking**:
   - Screenshot het overzicht elke maand
   - Maak een Excel voor XP growth charts
   - Vier milestones (100 XP, 500 XP, 1000 XP, etc.)

---

**Made with ❤️ for Papa & Zoon's journey to the million! 🏎️💨**
