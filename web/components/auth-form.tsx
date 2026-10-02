"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthFormProps = { mode: "login" | "signup" };

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!supabase) {
      setError("Supabase is not configured. Copy .env.local.example to .env.local and add your project values.");
      return;
    }
    setLoading(true);
    const result = isSignup
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setMessage(isSignup ? "Account created. Check your email if confirmation is enabled in Supabase." : "Signed in successfully. Your account is ready.");
  }

  return <main className="auth-page"><div><span className="mono">NO CAPS ACCOUNT</span><h1 className="display">{isSignup ? "JOIN THE CLUB." : "WELCOME BACK."}</h1><p>{isSignup ? "Create an account to track orders and keep your collection close." : "Sign in to track orders and keep your collection close."}</p><form onSubmit={handleSubmit}>{isSignup && <label className="mono">FULL NAME<input required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" /></label>}<label className="mono">EMAIL<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label className="mono">PASSWORD<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" /></label><button type="submit" className="button" disabled={loading}>{loading ? "PLEASE WAIT" : isSignup ? "CREATE ACCOUNT" : "SIGN IN"}</button></form>{error && <p className="auth-message auth-error">{error}</p>}{message && <p className="auth-message auth-success">{message}</p>}<span className="mono">{isSignup ? "ALREADY A MEMBER? " : "NEW HERE? "}<Link href={isSignup ? "/auth/login" : "/auth/signup"}>{isSignup ? "SIGN IN" : "CREATE AN ACCOUNT"}</Link></span></div></main>;
}
