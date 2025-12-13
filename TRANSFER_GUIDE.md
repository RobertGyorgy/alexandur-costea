# 📦 Ghid pentru Transferul Site-ului

## Ce să transferi (FIȘIERE ESENȚIALE)

### ✅ Include aceste fișiere și foldere:

```
📁 Proiect/
├── 📁 src/                    # Tot codul sursă
├── 📁 public/                 # Toate asset-urile (imagini, video, fonturi)
├── 📄 package.json            # Lista dependențelor
├── 📄 pnpm-lock.yaml          # Versiunile exacte ale dependențelor
├── 📄 next.config.mjs         # Configurația Next.js
├── 📄 tailwind.config.ts      # Configurația Tailwind
├── 📄 tsconfig.json           # Configurația TypeScript
├── 📄 postcss.config.mjs      # Configurația PostCSS
├── 📄 middleware.js           # Middleware Next.js
├── 📄 vercel.json             # Configurația Vercel (dacă folosești)
├── 📄 .gitignore              # Fișierul .gitignore
├── 📄 README.md               # Documentația
└── 📄 next-env.d.ts           # Tipuri Next.js
```

### ❌ NU transfera (se generează automat):

```
❌ node_modules/        # Se reinstalează cu pnpm install
❌ .next/              # Se generează la build
❌ out/                # Export static (dacă există)
❌ .env*.local         # Variabile de mediu locale
❌ *.log               # Log-uri
❌ tsconfig.tsbuildinfo # Cache TypeScript
❌ .DS_Store           # Fișiere sistem macOS
```

## 🚀 Pași pentru Transfer

### Opțiunea 1: Transfer Manual (USB/Cloud)

1. **Creează un arhivă fără node_modules:**
   ```bash
   # Exclude node_modules și alte fișiere inutile
   tar -czf site-backup.tar.gz \
     --exclude='node_modules' \
     --exclude='.next' \
     --exclude='out' \
     --exclude='*.log' \
     --exclude='.DS_Store' \
     --exclude='tsconfig.tsbuildinfo' \
     .
   ```

2. **Sau folosește zip:**
   ```bash
   zip -r site-backup.zip . \
     -x "node_modules/*" \
     -x ".next/*" \
     -x "out/*" \
     -x "*.log" \
     -x ".DS_Store" \
     -x "tsconfig.tsbuildinfo"
   ```

3. **În noul loc:**
   ```bash
   # Extrage arhiva
   tar -xzf site-backup.tar.gz
   # SAU
   unzip site-backup.zip
   
   # Instalează dependențele
   pnpm install
   
   # Rulează proiectul
   pnpm dev
   ```

### Opțiunea 2: Git (Recomandat)

1. **În locația veche:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **În noul loc:**
   ```bash
   git clone <repository-url>
   cd "landing page alex costea nou 2"
   pnpm install
   pnpm dev
   ```

### Opțiunea 3: Deployment pe Vercel/Netlify (Cel mai simplu)

**Vercel (Recomandat pentru Next.js):**
1. Conectează repository-ul GitHub/GitLab
2. Vercel detectează automat Next.js
3. Build-ul se face automat
4. Site-ul este live instant

**Netlify:**
1. Conectează repository-ul
2. Setează build command: `pnpm build`
3. Setează publish directory: `out` (dacă folosești static export)

## 📋 Checklist Transfer

- [ ] Codul sursă (`src/`)
- [ ] Asset-urile (`public/`)
- [ ] `package.json`
- [ ] `pnpm-lock.yaml` (important pentru versiuni exacte!)
- [ ] Fișierele de configurare (`.config.*`, `tsconfig.json`)
- [ ] `.gitignore`
- [ ] README.md (opțional)

## ⚠️ Important

1. **NU transfera `node_modules`** - ocupă mult spațiu și se reinstalează ușor
2. **Include `pnpm-lock.yaml`** - asigură versiuni identice ale dependențelor
3. **Verifică că ai toate asset-urile** din `public/`
4. **Dacă folosești variabile de mediu**, creează `.env.local` în noul loc

## 🔧 După Transfer

```bash
# 1. Instalează dependențele
pnpm install

# 2. Rulează în modul dezvoltare
pnpm dev

# 3. Build pentru producție
pnpm build

# 4. Start server producție
pnpm start
```

## 💡 Tips

- **Dimensiunea arhivei fără node_modules:** ~50-100 MB (în loc de 500+ MB)
- **Timp instalare dependențe:** ~5-10 secunde cu pnpm
- **Pentru deployment rapid:** Folosește Vercel - este gratuit și optimizat pentru Next.js


