"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function SWOTForm({ uid, onSaved }: { uid: string; onSaved: () => void }) {
  const [form, setForm] = useState({ strengths: "", weaknesses: "", opportunities: "", threats: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const token = await user.getIdToken();
      const res = await fetch("/api/swot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, data: form }),
      });
      if (!res.ok) throw new Error("Failed to save SWOT");
      setForm({ strengths: "", weaknesses: "", opportunities: "", threats: "" });
      onSaved();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="strengths" placeholder="Strengths" value={form.strengths} onChange={handleChange} required />
      <input name="weaknesses" placeholder="Weaknesses" value={form.weaknesses} onChange={handleChange} required />
      <input name="opportunities" placeholder="Opportunities" value={form.opportunities} onChange={handleChange} required />
      <input name="threats" placeholder="Threats" value={form.threats} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save SWOT"}</button>
    </form>
  );
}
