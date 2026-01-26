Final Stack (Confirmed)
Layer
Tech
Frontend
Next.js (App Router)
Auth
Firebase Authentication
Database
Firestore
Emails
EmailJS
Hosting
Vercel / Firebase Hosting


🧱 Overall Architecture (Next.js + Firebase)
Next.js (Frontend)
 ├── Firebase Auth (Login / Signup)
 ├── Firestore (SWOT Data)
 ├── EmailJS (Welcome Email)
 └── Protected Routes (Dashboard)

⚠️ No Express / Node backend needed

📁 Recommended Folder Structure (Next.js App Router)
/app
 ├── page.tsx                # Landing Page
 ├── login/page.tsx          # Login
 ├── signup/page.tsx         # Signup
 ├── dashboard/page.tsx      # SWOT Dashboard (Protected)
 └── layout.tsx

/lib
 ├── firebase.ts             # Firebase config
 ├── auth.ts                 # Auth helpers
 └── email.ts                # EmailJS logic

/components
 ├── AuthForm.tsx
 ├── SWOTForm.tsx
 └── SWOTList.tsx

/context
 └── AuthContext.tsx         # User state

/middleware.ts               # Route protection


🔥 Firebase Setup (Once)
1️⃣ Install dependencies
npm install firebase @emailjs/browser


2️⃣ Firebase config (/lib/firebase.ts)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

📌 Use .env.local for keys

🔐 Authentication Flow (Next.js)
Signup Page (/app/signup/page.tsx)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { sendWelcomeEmail } from "@/lib/email";

const handleSignup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendWelcomeEmail(email);
};


📧 EmailJS Setup (/lib/email.ts)
import emailjs from "@emailjs/browser";

export const sendWelcomeEmail = async (email: string) => {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    { user_email: email },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};

✅ Triggered only after successful signup

🧠 Auth Context (User State)
/context/AuthContext.tsx
"use client";

import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

Wrap this in layout.tsx.

📝 SWOT Data Model (Firestore)
users (collection)
 └── uid (document)
     └── swot (subcollection)
         └── swotId
             ├── strengths
             ├── weaknesses
             ├── opportunities
             ├── threats
             └── createdAt


📥 Save SWOT Data
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const saveSWOT = async (uid: string, data: any) => {
  await addDoc(collection(db, "users", uid, "swot"), {
    ...data,
    createdAt: new Date(),
  });
};


📊 Fetch SWOT Data (Dashboard)
import { getDocs, collection } from "firebase/firestore";

const swotRef = collection(db, "users", user.uid, "swot");
const snapshot = await getDocs(swotRef);

const swotData = snapshot.docs.map(doc => doc.data());


🔒 Protect Routes (Middleware)
/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase-auth-token");

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

⚠️ Simple version — production apps use Firebase Admin.

🔐 Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId}/swot/{docId} {
      allow read, write: if request.auth != null &&
                         request.auth.uid == userId;
    }
  }
}


🚀 Deployment
Vercel (Best for Next.js)
vercel

Add all NEXT_PUBLIC_* env variables.

🎯 Final Flow (End-to-End)
1️⃣ User lands on landing page
 2️⃣ Signup/Login
 3️⃣ Firebase creates user
 4️⃣ EmailJS sends welcome mail
 5️⃣ User fills SWOT form
 6️⃣ Data saved in Firestore
 7️⃣ Dashboard always shows saved SWOT
 8️⃣ Data visible in Firebase console

