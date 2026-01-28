
"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SendMessage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await addDoc(collection(db, "messages"), {
        firstName: formData.fullName,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      setSubmitStatus("success");

      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error saving message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-wrap">
      <div className="contact-card">
        <h2 className="contact-title">Let&apos;s talk direction!</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="contact-row-2">
            <div className="contact-field">
              <label>Hey, you&apos;re..</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="contact-field">
              <label>Your Professional Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="contact-row-1">
            <div className="contact-field">
              <label>Your thoughts in your words</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message.."
                required
              />
            </div>
          </div>

          {submitStatus === "success" && (
            <div className="contact-alert success">
              Message sent successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="contact-alert error">
              Failed to send message. Please try again.
            </div>
          )}

          <button className="contact-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Connect With Us"}
          </button>
        </form>
      </div>
    </section>
  );
}