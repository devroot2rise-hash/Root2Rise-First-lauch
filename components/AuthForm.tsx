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
import { sendWelcomeEmail } from "@/lib/email";

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

        // welcome email for signup only (don't block UI if it fails)
        sendWelcomeEmail(email, name).catch((e) => {
          console.error("Welcome email failed:", e);
        });
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

      // Detect new user: prefer additionalUserInfo.isNewUser, fallback to metadata check
      const gUser = result.user;
      const isNewFromResult = (result as any).additionalUserInfo?.isNewUser;
      const isNewFromMetadata = !!(
        gUser?.metadata?.creationTime &&
        gUser?.metadata?.lastSignInTime &&
        gUser.metadata.creationTime === gUser.metadata.lastSignInTime
      );
      const isNew = Boolean(isNewFromResult || isNewFromMetadata);

      // If new user, send welcome email (non-blocking)
      if (isNew && gUser?.email) {
        const user_name = gUser.displayName ?? gUser.email.split("@")[0] ?? "New User";
        console.log("Google signup new user:", user_name, gUser.email, isNewFromResult, isNewFromMetadata);
        sendWelcomeEmail(gUser.email, user_name).catch((e) => {
          console.error("Welcome email (google) failed:", e);
        });
      }

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
            <video
              src={"SigninBoyF.mp4"}
              autoPlay
              loop
              muted
               playsInline
              preload="auto"
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
          <video
              src={"SigninGirlF.mp4"}
              autoPlay
              loop
              muted
               playsInline
              preload="auto"
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