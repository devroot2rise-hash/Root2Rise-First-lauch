"use client";

import { useState } from "react";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { sendWelcomeEmail } from "@/lib/email";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit -> mode:", mode, "name:", name);
    setError("");
    setLoading(true);

    // client-side validation: require name on signup
    if (mode === "signup" && name.trim() === "") {
      setError("Please enter your name");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Try to set the user's display name so it's available in Firebase profile
        try {
          if (userCredential.user) {
            await updateProfile(userCredential.user, { displayName: name });
          }
        } catch (profileErr) {
          console.warn("updateProfile failed:", profileErr);
        }

        // Debug: log name before sending
        console.log("Signing up - name:", name);

        // Send welcome email (non-blocking). pass name and link URLs if provided.
        sendWelcomeEmail(
          email,
          name,
        ).catch((e) => {
          console.error("Welcome email failed:", e);
        });
      }
      
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Something went wrong");
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

      // If this is a new user (first-time sign-in via Google), send welcome email
      const gUser = result.user;

      // Detect new user robustly: prefer additionalUserInfo.isNewUser,
      // fallback to comparing metadata creationTime and lastSignInTime.
      const isNewFromResult = (result as any).additionalUserInfo?.isNewUser;
      const isNewFromMetadata = !!(
        gUser?.metadata?.creationTime &&
        gUser?.metadata?.lastSignInTime &&
        gUser.metadata.creationTime === gUser.metadata.lastSignInTime
      );

      const isNew = Boolean(isNewFromResult || isNewFromMetadata);

      if (isNew && gUser && gUser.email) {
        // Prefer displayName, fallback to email local-part or a generic label
        const user_name = gUser.displayName ?? gUser.email.split("@")[0] ?? "New User";
        console.log("Google signup detected as new user - name:", user_name, "email:", gUser.email, "isNewFromResult:", isNewFromResult, "isNewFromMetadata:", isNewFromMetadata);

        // Fire-and-forget welcome email; log any error
        sendWelcomeEmail(gUser.email, user_name).catch((e) => {
          console.error("Welcome email (google) failed:", e);
        });
      }

      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  // LOGIN MODE - matching login page design with video
  if (mode === "login") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={onClose}
      >
        <div
          className="modal-inner login-page"
          style={{
            borderRadius: "16px",
            maxWidth: "1100px",
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            ✕
          </button>

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
                      <span>Sign in with Apple</span>
                    </div>
                  </button>
                </div>

                {error && <div className="login-error">{error}</div>}

                <p className="login-footer">
                  Don&apos;t have an account?{" "}
                  <a href="#" onClick={(e) => { e.preventDefault(); setMode("signup"); }}>
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE VIDEO */}
          <div className="login-right">
            <video
              src={"SigninBoyF.mp4"}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // SIGNUP MODE - matching signup page design with video
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
        <div
        className="modal-inner auth-page"
        style={{
          borderRadius: "16px",
          maxWidth: "1100px",
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* LEFT SIDE VIDEO */}
        <div className="auth-image-side" style={{ overflow: "hidden" }}>
          <video
            src={"SigninGirlF.mp4"}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* RIGHT SIDE FORM */}
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
                  onChange={(e) => {
                    console.log("Name input onChange:", e.target.value);
                    setName(e.target.value);
                  }}
                  required
                  autoComplete="name"
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
                    <span>Sign in with Apple</span>
                  </div>
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <p className="auth-footer">
                Have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); }}>
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
