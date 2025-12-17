# ⚡ Quick Start - Reis naar het Miljoen

## 🎯 Je bent er bijna! Volg deze 3 stappen:

### Stap 1: Database Setup (5 minuten)

1. Ga naar **[console.neon.tech](https://console.neon.tech)**
2. Maak een account aan (gratis!)
3. Klik op "Create Project"
4. Geef je project een naam: "reis-naar-miljoen"
5. Kopieer de **Connection String** (ziet eruit als: `postgresql://...`)

### Stap 2: Authentication Setup (3 minuten)

1. Ga naar **[dashboard.clerk.com](https://dashboard.clerk.com)**
2. Maak een account aan (gratis!)
3. Klik op "Create Application"
4. Selecteer "Email" als login methode
5. Kopieer de **Publishable Key** van de API Keys pagina

### Stap 3: Configureer & Start (2 minuten)

1. **Open `.env.local`** in de project folder
2. **Vul je credentials in**:
   ```bash
   DATABASE_URL=jouw_neon_connection_string_hier
   VITE_DATABASE_URL=jouw_neon_connection_string_hier
   VITE_CLERK_PUBLISHABLE_KEY=jouw_clerk_key_hier
   ```

3. **Push database schema**:
   ```bash
   npm run db:push
   ```

4. **Start de app**:
   ```bash
   npm run dev
   ```

5. **Open je browser**: [http://localhost:5173](http://localhost:5173)

## 🎉 Klaar!

Je app draait nu! Je kunt:
- ✅ Inloggen/Registreren met je email
- ✅ Ochtendritueel voltooien (+25 XP)
- ✅ Missies voltooien
- ✅ Je voortgang wordt automatisch opgeslagen in de cloud

## 🐛 Problemen?

### "Database connection failed"
- Check of je `DATABASE_URL` correct is
- Zorg dat je connection string eindigt met `?sslmode=require`

### "Clerk not configured"
- Check of `VITE_CLERK_PUBLISHABLE_KEY` is ingevuld
- Herstart de dev server (`npm run dev`)

### Andere errors?
- Open browser console (F12) voor details
- Check [SETUP.md](./SETUP.md) voor uitgebreide instructies

## 📊 Database Bekijken

Wil je je database data zien?

```bash
npm run db:studio
```

Dit opent Drizzle Studio op [http://localhost:4983](http://localhost:4983)

## 🚀 Deployment (Optioneel)

Wil je de app online zetten?

```bash
npm i -g vercel
vercel
```

Volg de instructies en voeg je environment variables toe in het Vercel dashboard.

---

**Veel succes met de reis naar het miljoen! 🏎️💨**
