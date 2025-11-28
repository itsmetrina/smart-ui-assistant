# Smart UI Copy Assistant

A polished **Next.js + AI** full‑stack project that generates UX microcopy (buttons, tooltips, banners, error messages) using OpenAI models. Includes advanced features like **Improve Copy**, **Translate Copy**, and a fully custom **dark‑mode professional UI**.

This project is perfect for:

* Frontend engineers wanting practical AI integration experience
* Showcasing full‑stack skills using Next.js App Router
* Building a portfolio‑ready AI product

---

# ✨ Features

### ✔ AI‑powered UX Copy Generation

Enter component type, tone, and context → AI generates 3 clean UX copy variations.

### ✔ Improve Copy

Click **Improve ✨** on any generated text to get a refined, higher‑quality version.

### ✔ Translate Copy

Translate the generated copy into:

* English
* Hindi
* Bengali

### ✔ Fully Dark Mode UI

Custom black theme powered by Tailwind + CSS variables.

### ✔ Smooth UX

* Animated fade‑in transitions
* Non‑blocking result cards (no alert popups)
* Auto‑scroll to results
* Card hover effects
* Polished interactions

---

# 🛠️ Tech Stack

* **Next.js 14** (App Router)
* **React 18**
* **TailwindCSS** (custom dark mode)
* **OpenAI API** (`gpt-4o-mini`)
* **TypeScript**

---

# 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-ui-copy-assistant.git
cd smart-ui-copy-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named:

```
.env.local
```

Add:

```env
OPENAI_API_KEY=your_key_here
```

### 4. Run the dev server

```bash
npm run dev
```

Open in browser:
👉 [http://localhost:3000](http://localhost:3000)

---

# 🚀 Deploying to Vercel

Deploying this project on Vercel is extremely simple.

### Step 1 — Install Vercel CLI (optional)

```bash
npm i -g vercel
```

### Step 2 — Login

```bash
vercel login
```

### Step 3 — Deploy

Inside the project directory:

```bash
vercel
```

Or use Vercel Dashboard:

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Add environment variable:

   * `OPENAI_API_KEY`
4. Deploy

### Vercel automatically:

* Detects Next.js
* Builds serverless API routes
* Hosts frontend + backend together
* Optimizes Tailwind

---

# 🗂️ Folder Structure

```
app/
  ├── api/
  │   ├── generate/route.ts
  │   ├── improve/route.ts
  │   └── translate/route.ts
  ├── components/
  │   ├── CopyForm.tsx
  │   ├── CopyPreview.tsx
  │   ├── ImproveResult.tsx
  │   └── TranslateResult.tsx
  ├── layout.tsx
  └── page.tsx
public/
styles/
  └── globals.css
.env.local
```

---

# 🧠 How It Works

### Frontend (Client Components)

* User fills form → triggers `/api/generate`
* Results displayed in polished cards
* Improve & Translate buttons call respective APIs
* Additional result cards appear dynamically

### Backend (Next.js Route Handlers)

* `/api/generate` → prompts AI to output 3 variations
* `/api/improve` → refines selected copy
* `/api/translate` → returns structured translations

All backend routes run securely on the server.

---

# 📘 Example Prompt

```
Component: button
Tone: friendly
Context: Checkout submit button
```

AI returns:

```
["Place Your Order","Finish Checkout","Complete Your Purchase"]
```

---

# 🎨 UI Screenshots

*(Optional — Add images once deployed)*

---

# 🤝 Contributing

Feel free to open issues or PRs for improvements, new features, or suggestions.

---

# 🧩 Future Enhancements (Ideas)

* Save copy to localStorage
* Copy-to-clipboard button
* History panel
* Language selector
* Framer Motion animation upgrades
* Light/Dark toggle (if needed later)

---

# 📄 License

MIT License — free to use, modify, and share.

---

# 🚀 Final Note

This project is a clean, portfolio‑ready demonstration of:

* Next.js full‑stack skills
* AI integration
* UI/UX execution
* Component architecture
* Modern frontend engineering