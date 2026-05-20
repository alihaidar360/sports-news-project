HEAD
# TheSportsNewsLive — Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Connect Your Sanity Backend

Open `src/sanity/config.js` and replace the placeholder values:

```js
export const client = createClient({
  projectId: "YOUR_PROJECT_ID",   // ← your Sanity project ID
  dataset:   "production",        // ← your dataset name
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

**Find your Project ID:**
- Go to https://sanity.io/manage
- Select your project → Settings → API

Or use environment variables (recommended for production):

Create a `.env` file:
```
REACT_APP_SANITY_PROJECT_ID=abc123de
REACT_APP_SANITY_DATASET=production
```

## 3. Sanity Schema Requirements

Your Sanity schema should include a `post` document type with these fields
(which you mentioned are already set up):

| Field          | Type     | Notes                        |
|----------------|----------|------------------------------|
| `title`        | string   | Required — post headline     |
| `description`  | text     | Short summary / teaser       |
| `featuredImage`| image    | Used in hero, cards, thumbs  |
| `videoLinks`   | array    | URLs to embedded videos      |
| `tweetEmbeds`  | array    | Tweet URLs for embedding     |
| `category`     | reference| Points to a category doc     |
| `author`       | reference| Points to an author doc      |
| `publishedAt`  | datetime | Sort and display date        |
| `slug`         | slug     | URL slug for each post       |
| `readTime`     | number   | Estimated minutes to read    |

## 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:5173

## 5. How Auto-Updates Work

The app uses `sanityClient.listen()` to subscribe to real-time document changes.
When you publish or edit a post in Sanity Studio:

1. Sanity emits a change event via webhook
2. The React app receives it immediately
3. All data-fetching functions re-run automatically
4. The UI updates without page refresh

This is handled in `App.jsx`:
```jsx
useEffect(() => {
  const subscription = sanityClient
    .listen('*[_type == "post"]')
    .subscribe(() => {
      fetchFeatured();
      fetchTrending();
      fetchLatest();
    });
  return () => subscription.unsubscribe();
}, []);
```

## 6. CORS Configuration

For the Sanity client to work from your local dev server or deployed URL,
add your domain to the CORS origins in Sanity:

- Go to https://sanity.io/manage → Your Project → API → CORS Origins
- Add: `http://localhost:5173` (dev)
- Add: `https://yourdomain.com` (production)

## 7. Production Build

```bash
npm run build
```

Output goes to `/dist` — deploy to Vercel, Netlify, or any static host.

For Vercel deployment, add environment variables in the Vercel dashboard
under Project Settings → Environment Variables.

## 8. Live Scores Integration

Currently, the Live Scores section uses static demo data in `LIVE_SCORES` (App.jsx).
To connect real scores, replace with an API call to any sports data provider:

- **SportRadar** — https://sportradar.com/
- **API-Football** — https://api-football.com/
- **TheSportsDB** — https://www.thesportsdb.com/api.php (free tier)
- **RapidAPI Sports** — https://rapidapi.com/category/Sports

Example integration:
```jsx
useEffect(() => {
  const fetchScores = async () => {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures?live=all`, {
      headers: { "x-apisports-key": process.env.REACT_APP_FOOTBALL_API_KEY }
    });
    const data = await res.json();
    setScores(data.response);
  };
  fetchScores();
  const interval = setInterval(fetchScores, 30000); // refresh every 30s
  return () => clearInterval(interval);
}, []);
```

## 9. File Structure

```
TheSportsNewsLive/
├── src/
│   ├── App.jsx           ← Main app with all components and Sanity hooks
│   ├── index.css         ← Full design system styles
│   ├── main.jsx          ← React entry point
│   └── sanity/
│       └── config.js     ← Sanity client, queries, subscription helper
├── public/
│   └── index.html
├── package.json
└── README.md
```

## 10. Fonts Used

The design uses three typefaces loaded from Google Fonts:
- **Bebas Neue** — Display headlines, section titles, scores
- **DM Sans** — Body text, UI elements, navigation
- **DM Serif Display** — Editorial card titles, feature articles

Add this to your `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

