import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Auth helpers placeholder
// Implement authentication helpers here

export const saveSWOT = async (uid: string, data: any) => {
  await addDoc(collection(db, "users", uid, "swot"), {
    ...data,
    createdAt: new Date(),
  });
};
