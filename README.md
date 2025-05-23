
# 🎶 AASTU Choir GC Gallery – 2025

A web-based gallery for showcasing memorable moments of the AASTU Choir Graduating Class of 2025. This project uses React, TypeScript, Vite, Tailwind CSS, and Firebase to create a smooth, responsive, and dynamic experience.

## Deployment
The gallery is live at [https://aastugc2025.vercel.app/](https://aastugc2025.vercel.app/).

## 📸 Features

- **Photo Gallery** – Displays images of GC members uploaded and managed through Firebase.
- **Responsive Design** – Works seamlessly across all devices.
- **Cloud Integration** – Firebase used for storing and retrieving image files in real time.

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend/Storage**: Firebase Storage & Firebase SDK

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm (v8+)
- Firebase account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/HabibElias/Aastu-Choir-Gc-Gallery.git
cd Aastu-Choir-Gc-Gallery
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

- Create a Firebase project at [https://firebase.google.com](https://firebase.google.com)
- Enable Firebase Storage.
- Create a `.env` file at the root of the project and add your Firebase config:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

4. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/        # Reusable components
│   ├── firebase/          # Firebase initialization and logic
│   ├── pages/             # Page components
│   └── styles/            # Tailwind CSS files
├── .env                   # Environment variables for Firebase
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 📦 Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Run in development mode            |
| `npm run build`  | Build the app for production       |
| `npm run preview`| Preview the production build       |

## 🔐 Firebase

This project uses Firebase for:

- **Storage**: Uploading and retrieving images from Firebase Storage.
- **Hosting (optional)**: Can also be used to deploy the app with `firebase deploy`.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

