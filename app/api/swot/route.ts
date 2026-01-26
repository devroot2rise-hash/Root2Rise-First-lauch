import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// POST: Add a new SWOT entry
export async function POST(req: NextRequest) {
  try {
    const { uid, data } = await req.json();
    if (!uid || !data) return NextResponse.json({ error: "Missing uid or data" }, { status: 400 });
    const docRef = await addDoc(collection(db, "users", uid, "swot"), {
      ...data,
      createdAt: new Date(),
    });
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// GET: Fetch all SWOT entries for a user (uid as query param)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });
    const swotRef = collection(db, "users", uid, "swot");
    const snapshot = await getDocs(swotRef);
    const swots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(swots);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}