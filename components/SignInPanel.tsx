"use client";

import { FormEvent, useState } from "react";
import { sendPasswordReset, signIn, signUpWithEntry } from "@/lib/database";

export default function SignInPanel() {
  const [mode, setMode] = useState<"join" | "signin">("join");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const displayName = String(form.get("displayName") || "").trim();
    const poolCode = String(form.get("poolCode") || "").trim().toUpperCase();

    if (poolCode !== (process.env.NEXT_PUBLIC_POOL_CODE || "SALANDRA2026")) {
      setMessage("That pool code does not match.");
      return;
    }

    try {
      if (mode === "join") {
        await signUpWithEntry(email, password, displayName, poolCode);
      } else {
        await signIn(email, password);
      }
      setMessage("Signed in. Your entry is ready.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    }
  }

  async function resetPassword() {
    const email = window.prompt("Enter the email address for your pool account.");
    if (!email) return;
    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send password reset.");
    }
  }

  return (
    <section className="signin-box">
      <h2>{mode === "join" ? "Join Pool" : "Sign In"}</h2>
      <form onSubmit={submit}>
        {mode === "join" ? (
          <label>
            Name
            <input name="displayName" required />
          </label>
        ) : null}
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" minLength={6} required />
        </label>
        <label>
          Pool code
          <input name="poolCode" defaultValue="SALANDRA2026" required />
        </label>
        <button className="button primary" type="submit">
          {mode === "join" ? "Create Entry" : "Sign In"}
        </button>
      </form>
      <button className="link-button" type="button" onClick={() => setMode(mode === "join" ? "signin" : "join")}>
        {mode === "join" ? "Already joined? Sign in" : "Need an entry? Join pool"}
      </button>
      <button className="link-button" type="button" onClick={resetPassword}>
        Reset password
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </section>
  );
}
