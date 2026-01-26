// "use client";

// import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export default function SendMessage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       // Add document to Firestore
//       await addDoc(collection(db, "messages"), {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         message: formData.message,
//         createdAt: new Date()
//       });

//       setSubmitStatus("success");
//       // Reset form
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         message: ""
//       });
//     } catch (error) {
//       console.error("Error saving message:", error);
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <section className="flex items-center justify-center py-16 px-4 rounded-b-3xl">
//       <div className="w-full max-w-xl">
//         <form className="bg-white shadow-lg rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold mb-2">Ask Me Anything</h2>
//         </div>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="field">
//                 <label className="block text-md font-medium mb-1 text-black">First Name</label>
//                 <input 
//                   type="text" 
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="First name" 
//                   required
//                   className="w-full px-4  py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none"
//                 />
//               </div>
//               <div className="field">
//                 <label className="block text-md font-medium mb-1 text-black">Last Name</label>
//                 <input 
//                   type="text" 
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last name" 
//                   required
//                   className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none"
//                 />
//               </div>
//             </div>

//             <div className="field">
//               <label className="block text-md font-medium mb-1 text-black">Email</label>
//               <input 
//                 type="email" 
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your@email.com" 
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 text-black focus:border-transparent outline-none"
//               />
//             </div>

//             <div className="field">
//               <label className="block text-sm font-medium text-black mb-1">Message</label>
//               <textarea 
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Ask me anything..." 
//                 rows={4}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none resize-none"
//               />
//             </div>
//           </div>

//           {submitStatus === "success" && (
//             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//               Message sent successfully! We&apos;ll get back to you soon.
//             </div>
//           )}

//           {submitStatus === "error" && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               Failed to send message. Please try again.
//             </div>
//           )}

//           <button 
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
//             type="submit"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SendMessage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        firstName: formData.firstName,
        lastName: formData.lastName, // stored even if not shown in UI
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      setSubmitStatus("success");

      setFormData({
        firstName: "",
        lastName: "",
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
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder=""
                required
              />
            </div>

            <div className="contact-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="contact-row-1">
            <div className="contact-field">
              <label>Message</label>
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