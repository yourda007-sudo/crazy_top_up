=========================================================
Crazy_top_up (24) — Complete Spin & Top-Up System Bundle
=========================================================

GitHub Repo (yourda007-sudo/crazy_top_up) e upload korar niyom:

1. EI ZIP ER SOB FILE EXTRACT KORUN.
2. Apnar GitHub repository-te existing file gulo KEEP korben (delete korben na):
   - account.js
   - Banner 1.jpg, Banner 2.jpg, Banner 3.jpg, Main logo.jpg, etc. sob .jpg chobi
3. Zip theke ei file gulo GitHub repo-r ROOT folder-e upload / replace korun:
   - package.json   <-- (OBOSSHOI upload korben jate Render-e 'express' missing error na ashe!)
   - FFX.html
   - admin.html
   - server.js
   - spin-system.css
   - spin-system.js
   - manifest.json
   - sw.js
   - apple-touch-icon.png
   - icon.svg
   - pwa-192x192.png
   - pwa-512x512.png
   - pwa-maskable-512x512.png

4. Render / Railway Hosting Settings:
   - Build Command: npm install
   - Start Command: node server.js
   - Environment Variable:
       ADMIN_PASSKEY=your_secret_password
       TELEGRAM_BOT_TOKEN=optional_bot_token
       TELEGRAM_CHAT_ID=optional_chat_id
   - Render/Railway use korle persistent disk mount korben jate spin-db.json save thake.

5. Admin Panel URL: https://yourdomain.com/admin.html
   (Default passkey: crazy24admin jodi ADMIN_PASSKEY set na thake)

6. Google / Gmail Login (Firebase Authorized Domains):
   - Google Sign-In popup live site (like crazy-top-up-24.onrender.com) e chalu korte:
     Firebase Console -> Authentication -> Settings -> Authorized domains ->
     "Add domain" e click kore 'crazy-top-up-24.onrender.com' add korun.
   - Domain add korar aageo modal er nicher Gmail form diye user login korte parbe!
