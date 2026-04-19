# EbookFlip — Complete Setup Guide

## File Structure

```
ebookflip/
├── index.html                ← Landing page
├── css/
│   ├── global.css            ← Shared styles (colours, nav, auth forms)
│   ├── landing.css           ← Landing page only
│   ├── dashboard.css         ← Dashboard only
│   └── checkout.css          ← Checkout page only
├── js/
│   ├── auth.js               ← Login / signup / session logic
│   ├── landing.js            ← Phone animation, book columns, marquee
│   └── dashboard.js          ← Ebook grid, preview modal, download
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── checkout.html         ← Stripe payment form lives here
│   └── dashboard.html        ← Member ebook library
├── data/
│   └── ebooks.js             ← ⭐ ALL YOUR EBOOK CONTENT IS HERE
└── assets/
    ├── images/
    │   ├── shopify-logo.png  ← Drop your logo here
    │   └── covers/           ← Drop ebook cover images here
    └── files/                ← Drop real PDF/DOCX files here
```

---

## STEP 1 — Run It Locally

Just open `index.html` in your browser. No server needed for local testing.

For Stripe to work in production you need HTTPS, so use one of:
- **Netlify** (free): drag the whole folder to netlify.com/drop
- **Vercel** (free): `npx vercel` in the folder
- **GitHub Pages**: push to a repo, enable Pages in Settings

---

## STEP 2 — Set Up Stripe Payments

### 2a. Create your Stripe account
1. Go to https://stripe.com → click **Start now**
2. Complete your business details
3. Go to **Developers → API Keys**

### 2b. Add your publishable key
Open `pages/checkout.html` and find this line near the top:

```js
const STRIPE_PUBLISHABLE_KEY = 'pk_test_REPLACE_WITH_YOUR_KEY';
```

Replace it with your actual key:
```js
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51abc123...your_real_key';
```

**Use `pk_test_` for testing. Use `pk_live_` when you go live.**

### 2c. Create a backend for PaymentIntents

Stripe requires a server to create PaymentIntents (to keep your secret key safe).
Here are two quick options:

---

**Option A — Vercel Serverless Function (recommended, free)**

Create a file called `api/create-payment-intent.js`:

```js
const Stripe = require('stripe');

module.exports = async (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, currency = 'usd' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,          // in cents: 9700 = $97.00
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
```

Then in Vercel dashboard, add environment variable:
- Key: `STRIPE_SECRET_KEY`
- Value: `sk_test_your_secret_key` (from Stripe → Developers → API Keys)

Update `BACKEND_URL` in checkout.html:
```js
const BACKEND_URL = 'https://your-project.vercel.app/api/create-payment-intent';
```

---

**Option B — Express.js (if you have a Node server)**

```js
const express = require('express');
const Stripe  = require('stripe');
const cors    = require('cors');

const app    = express();
const stripe = new Stripe('sk_test_YOUR_SECRET_KEY'); // keep this on server only!

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  const intent = await stripe.paymentIntents.create({ amount, currency });
  res.json({ clientSecret: intent.client_secret });
});

app.listen(3001, () => console.log('Server on port 3001'));
```

### 2d. Test payments
Use these test card numbers (no real charge occurs):
| Card number          | Result         |
|---------------------|----------------|
| 4242 4242 4242 4242 | ✅ Success      |
| 4000 0000 0000 9995 | ❌ Declined     |
| 4000 0025 0000 3155 | 🔐 3D Secure    |

Use any future expiry date and any 3-digit CVC.

### 2e. Go live
- Switch `pk_test_` → `pk_live_` in checkout.html
- Switch `sk_test_` → `sk_live_` in your server
- Complete Stripe account verification in the Stripe dashboard

---

## STEP 3 — Replace Images & Logos

### Platform logos (As Seen On section)
1. Get your logo files (PNG/SVG, transparent background, ~100×32px recommended)
2. Drop them into `assets/images/`
3. In `index.html` find the `.logos-row` section and update the `<img src="">` paths

```html
<!-- Example: swap Shopify logo -->
<img src="assets/images/shopify-logo.png" alt="Shopify" class="platform-logo">
```

### Ebook cover images
1. Create a cover image (recommended: **420×280px**, PNG or JPG)
2. Save it to `assets/images/covers/my-ebook-name.jpg`
3. Open `data/ebooks.js`
4. Find the ebook entry and set the `cover` field:

```js
{
  id: 1,
  name: "Wealth Building Blueprint",
  cover: "assets/images/covers/wealth-blueprint.jpg",  // ← add this
  ...
}
```

The emoji will automatically disappear and the image will show instead.

---

## STEP 4 — Edit or Replace Ebooks

### Change an ebook's title, description, or metadata
Open `data/ebooks.js` and find the entry. Every field is editable:

```js
{
  id: 1,
  name:    "Your New Title",          // ← card title
  niche:   "Finance",                 // ← filter category
  desc:    "Short description here",  // ← shown on card
  pages:   "52 pages",               // ← metadata label
  price:   "$47",                    // ← suggested retail shown in preview
  emoji:   "💰",                      // ← shown if no cover image
  bg:      "#1a1f12",                // ← background colour if no cover
```

### Change the preview content (Table of Contents + Chapter excerpt)
In `data/ebooks.js`, edit these two fields:

```js
tableOfContents: [
  "1. Your Chapter Title",
  "2. Another Chapter",
  // add as many as you want
],
previewText: `CHAPTER 1: YOUR TITLE
━━━━━━━━━━━━━━━━━━━━━

Paste your actual chapter text here.
Users see this in the preview modal before downloading.`,
```

### Serve a real PDF or DOCX file
1. Put your file in `assets/files/` (e.g. `wealth-blueprint.pdf`)
2. In `data/ebooks.js`, set the `file` field:

```js
file: "assets/files/wealth-blueprint.pdf",
```

When set, the Download button sends the real file instead of generating text.

### Add a brand new ebook
Copy any entry in `data/ebooks.js` and give it a new `id`:

```js
{
  id: 25,                              // ← must be unique
  emoji: "🎨",
  name: "Canva Design Masterclass",
  niche: "Creative",
  desc: "Create scroll-stopping graphics in minutes with no design experience.",
  pages: "41 pages",
  bg: "#1a121f",
  cover: "",
  file: "",
  price: "$37",
  tableOfContents: [
    "1. Getting Started with Canva",
    "2. Colour Theory Basics",
    "3. Typography That Converts",
    "4. Social Media Templates",
    "5. Selling Your Designs"
  ],
  previewText: `Your chapter text here...`
},
```

Save the file — it appears instantly in the dashboard.

---

## STEP 5 — Change Brand Colours

Open `css/global.css` and find:

```css
:root {
  --accent:  #d4f542;   /* ← main colour (buttons, highlights) */
  --accent2: #bedd28;   /* ← hover state (slightly darker) */
}
```

Replace with your own hex colours. Everything updates automatically.

---

## STEP 6 — Deploy to the Web

### Netlify (easiest, free)
1. Go to https://app.netlify.com/drop
2. Drag your entire `ebookflip/` folder onto the page
3. Done — you get a live URL instantly

### Custom domain
In Netlify: Site settings → Domain management → Add custom domain
Point your domain's DNS to Netlify's servers (they give you the records).

---

## Auth Notes

The current auth uses `localStorage` — great for a prototype.

For a real production site, you'll want a proper backend auth system.
Options:
- **Supabase** (free tier, PostgreSQL + auth): supabase.com
- **Firebase Auth** (free tier): firebase.google.com
- **Clerk** (easiest drop-in auth): clerk.com

When a user pays via Stripe, call your backend to store their `plan` in a database,
then issue a JWT or session cookie instead of using localStorage.

---

## Quick Customisation Checklist

- [ ] Replace `pk_test_REPLACE_WITH_YOUR_KEY` in checkout.html
- [ ] Add your backend URL in checkout.html
- [ ] Add Shopify logo to assets/images/shopify-logo.png
- [ ] Edit ebook titles/descriptions in data/ebooks.js
- [ ] Add cover images to assets/images/covers/
- [ ] Add real PDF files to assets/files/ (optional)
- [ ] Change brand colour in css/global.css
- [ ] Deploy to Netlify or Vercel
- [ ] Connect custom domain
- [ ] Switch to live Stripe keys when ready
