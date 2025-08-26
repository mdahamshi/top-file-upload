# 📂 SaraFiles

SaraFiles is a stripped-down personal storage service, inspired by Google Drive.
It allows users to securely authenticate, create folders, upload files, and share content.
The project is built with a **React frontend** and a **Node.js + Express + Prisma backend**.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite/CRA), TailwindCSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Passport.js (session-based)
- **File Uploads**: Multer (filesystem for local dev, optional cloud storage for production)
- **Storage Options**: Cloudinary Storage (recommended for production)

---

## ✨ Features

- 🔐 **Session-based authentication** using Passport.js (persisted in DB via Prisma session store)
- 📁 **Folder management** (CRUD for folders)
- 📤 **File uploads** with Multer
- 📑 **File details view** (name, size, upload time)
- ⬇️ **Download files** directly from the app
- ☁️ **Cloud storage support** (store URLs in DB, e.g. Cloudinary or Supabase)
- 🔗 **Share folders** with public links that expire after a set duration (extra credit)

---

## 📂 Project Structure

```
SaraFiles/
│
├── client/                 # React frontend
│   ├── src/
│   └── package.json
│
├── server/                 # Express + Prisma backend
│   ├── src/
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Multer, auth, etc.
│   │   ├── prisma/         # Prisma schema
│   │   └── app.js
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone repo

```bash
git clone https://github.com/mdahamshi/top-file-upload.git
cd top-file-upload
```

### 2. Backend (server)

```bash
cd server
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

### 3. Frontend (client)

```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Backend `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/sarafiles"
SESSION_SECRET="supersecretkey"
CLOUDINARY_URL="your_cloudinary_url" # or Supabase storage keys
```

---

## 📡 API Endpoints

- `POST /auth/login` – Login user
- `POST /auth/register` – Register user
- `POST /files/upload` – Upload file (requires auth)
- `GET /files/:id` – Get file details
- `GET /files/:id/download` – Download file
- `POST /folders` – Create folder
- `GET /folders/:id` – View folder contents
- `POST /share` – Generate shareable link

---

## 🛠️ Development Notes

- Local dev saves files to filesystem using **Multer**.
- Production deployment should use **cloud storage** (Cloudinary / Supabase).
- Prisma migrations handle schema changes.

---

## 🚧 Roadmap

- [x] Authentication
- [x] File upload (local)
- [x] Folder CRUD
- [x] File metadata & download
- [x] Cloud storage integration
- [x] Public folder sharing with expiring links
- [x] UI polish (React)

---

## 📸 Screenshots

![Screenshot](sc.png)
![Screenshot](sc2.png)

---

## 📜 License

MIT License © 2025 [Mohammad Dahamsheh](https://github.com/yourusername)
