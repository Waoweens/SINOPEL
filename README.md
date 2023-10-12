# SINOPEL

Sistem Notulensi dan Pelaporan Digital (SINOPEL)

## Builds

Production build: <br />
https://sinopel.id

Development build: <br />
https://dev.sinopel.id

## Configuration
> [!NOTE]
> All configuration are stored in environment variables.
> You can pass or export them directly
> or you can use an [env file](https://vitejs.dev/guide/env-and-mode.html). <br />
> Recommended: `.env.local`
```
VITE_FIREBASE_APIKEY="..."
VITE_FIREBASE_AUTHDOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECTID="your-app"
VITE_FIREBASE_STORAGEBUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGINGSENDERID="..."
VITE_FIREBASE_APPID="1:...:web:..."
VITE_FIREBASE_MEASUREMENTID="G-..."

VITE_API_BASEURL="http://api.your.app"

FBA_PROJECT_ID="your-app"
FBA_CLIENT_EMAIL="firebase-adminsdk-...@your-app.iam.gserviceaccount.com"

# note: encase them in single quotes, keep the double quotes, preserve \n
FBA_PRIVATE_KEY='"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"'
```

## Developing

### Frontend

Once you've opened the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Backend

The python (flask) backend is in the `sinopel-api/` folder. You can start a flask development server with

```bash
flask run --debug
```

## Building

### Frontend

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your frontend, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Backend

You can use a WSGI server such as Waitress or Gunicorn
