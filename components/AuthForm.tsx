// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { sendWelcomeEmail } from "@/lib/email";

// function setAuthCookie(token: string) {
//   document.cookie = `firebase-auth-token=${token}; path=/;`;
// }

// export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     try {
//       let userCredential;
//       if (mode === "login") {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         await sendWelcomeEmail(email);
//       }
//       const token = await userCredential.user.getIdToken();
//       setAuthCookie(token);
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setError("");
//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken();
//       setAuthCookie(token);
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
//       <button type="button" onClick={handleGoogleSignIn} style={{ marginLeft: 8 }}>
//         Sign in with Google
//       </button>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//     </form>
//   );
// }
// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/lib/firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { sendWelcomeEmail } from "@/lib/email";

// function setAuthCookie(token: string) {
//   document.cookie = `firebase-auth-token=${token}; path=/;`;
// }

// export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
//   const [name, setName] = useState(""); // only for signup UI
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       let userCredential;

//       if (mode === "login") {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         // welcome email for signup only
//         // await sendWelcomeEmail(email);
//       }

//       const token = await userCredential.user.getIdToken();
//       setAuthCookie(token);
//       router.push("/");
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setError("");
//     setGoogleLoading(true);

//     try {
//       const provider = new GoogleAuthProvider();
//       const result = await signInWithPopup(auth, provider);

//       const token = await result.user.getIdToken();
//       setAuthCookie(token);

//       router.push("/");
//     } catch (err: any) {
//       setError(err.message || "Google sign-in failed");
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       {/* IMAGE SIDE */}
//       <div className="auth-image-side">
//           <Image src="/loginpg2.png" alt="Auth Illustration" width={600} height={600} />
//       </div>
//       {/* FORM SIDE */}
//       <div className="auth-form-side">
//         <div className="auth-box">
//           <h1 className="auth-title">
//             {mode === "login" ? "Welcome back!" : "Get Started Now"}
//           </h1>

//           {mode === "login" && (
//             <p className="auth-subtitle">
//               Enter your Credentials to access your account
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="auth-form">
//             {mode === "signup" && (
//               <div className="auth-field">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             )}

//             <div className="auth-field">
//               <label>Email address</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="auth-field">
//               <div className="auth-pass-row">
//                 <label>Password</label>

//                 {mode === "login" && (
//                   <a className="auth-link" href="#">
//                     forgot password
//                   </a>
//                 )}
//               </div>

//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="auth-check">
//               <input type="checkbox" />
//               <p>
//                 {mode === "login"
//                   ? "Remember for 30 days"
//                   : "I agree to the "}
//                 {mode === "signup" && (
//                   <>
//                     <span>terms</span> & <span>policy</span>
//                   </>
//                 )}
//               </p>
//             </div>

//             <button className="auth-btn" type="submit" disabled={loading}>
//               {loading
//                 ? mode === "login"
//                   ? "Logging in..."
//                   : "Creating..."
//                 : mode === "login"
//                 ? "Login"
//                 : "Signup"}
//             </button>

//             <div className="auth-divider">
//               <span>Or</span>
//             </div>

//             <div className="auth-social">
//               <button
//                 className="social-btn"
//                 type="button"
//                 onClick={handleGoogleSignIn}
//                 disabled={googleLoading}
//               >
//                 {googleLoading ? "Loading..." : "Sign in with Google"}
//               </button>

//               <button className="social-btn" type="button" disabled>
//                 Sign in with Apple
//               </button>
//             </div>

//             {error && <div className="auth-error">{error}</div>}

//             <p className="auth-footer">
//               {mode === "login" ? (
//                 <>
//                   Don&apos;t have an account? <a href="/signup">Sign Up</a>
//                 </>
//               ) : (
//                 <>
//                   Have an account? <a href="/login">Sign In</a>
//                 </>
//               )}
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// import { sendWelcomeEmail } from "@/lib/email";

function setAuthCookie(token: string) {
  document.cookie = `firebase-auth-token=${token}; path=/;`;
}

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [name, setName] = useState(""); // only for signup UI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userCredential;

      if (mode === "login") {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // welcome email for signup only
        // await sendWelcomeEmail(email);
      }

      const token = await userCredential.user.getIdToken();
      setAuthCookie(token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();
      setAuthCookie(token);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // =========================
  // LOGIN UI (NEW DESIGN)
  // =========================
  if (mode === "login") {
    return (
      <div className="login-page">
        {/* LEFT SIDE FORM */}
        <div className="login-left">
          <div className="login-box">
            <h1 className="login-title">Welcome back!</h1>
            <p className="login-subtitle">
              Enter your Credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-field">
                <div className="login-pass-row">
                  <label>Password</label>
                  <a className="login-link" href="#">
                    forgot password
                  </a>
                </div>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="login-divider">
                <span>Or</span>
              </div>

              <div className="login-social">
            <button
              className="login-social-btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                "Loading..."
              ) : (
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"20px"}}>
                  <Image
                    src="/googleLogo.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="login-google-logo"
                  />
                  <span>Sign in with Google</span>
                </div>
              )}
            </button>
            
                <button className="login-social-btn" type="button" disabled>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"20px"}}>
                  <Image
                    src="/appleLogo.png"
                    alt="Apple Logo"
                    width={20}
                    height={20}
                    className="login-apple-logo"
                  />
                  <span>Sign in with Google</span>
                </div>
                </button>
              </div>

              {error && <div className="login-error">{error}</div>}

              <p className="login-footer">
                Don&apos;t have an account? <a href="/signup">Sign Up</a>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE (PLACEHOLDER) */}
        <div className="login-right">
            {/* Replace /loginpg2.png with your image */}
            <Image
              src="/loginimg2.png"
              alt="Login Illustration"
              width={650}
              height={650}
              className="login-image"
              priority
            />
        </div>
      </div>
    );
  }

  // =========================
  // SIGNUP UI (SAME AS YOUR CURRENT)
  // =========================
  return (
    <div className="auth-page">
      {/* IMAGE SIDE */}
      <div className="auth-image-side">
        <Image
          src="/loginpg4.png"
          alt="Auth Illustration"
          width={600}
          height={600}
        />
      </div>

      {/* FORM SIDE */}
      <div className="auth-form-side">
        <div className="auth-box">
          <h1 className="auth-title">Get Started Now</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-pass-row">
                <label>Password</label>
              </div>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-check">
              <input type="checkbox" />
              <p>
                I agree to the <span>terms</span> & <span>policy</span>
              </p>
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Signup"}
            </button>

            <div className="auth-divider">
              <span>Or</span>
            </div>

            <div className="auth-social">
            <button
              className="login-social-btn"
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                "Loading..."
              ) : (
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"20px"}}>
                  <Image
                    src="/googleLogo.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="login-google-logo"
                  />
                  <span>Sign in with Google</span>
                </div>
              )}
            </button>

                <button className="login-social-btn" type="button" disabled>
                  <div style={{display:"flex",flexDirection:"row",justifyContent:"center",gap:"20px"}}>
                  <Image
                    src="/appleLogo.png"
                    alt="Apple Logo"
                    width={20}
                    height={20}
                    className="login-apple-logo"
                  />
                  <span>Sign in with Google</span>
                </div>
                </button>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <p className="auth-footer">
              Have an account? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}