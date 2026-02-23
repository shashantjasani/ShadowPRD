"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "shadow-prd-auth";
const PASSWORD_HASH = "shadow2026";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === PASSWORD_HASH) {
        setAuthenticated(true);
      }
    } catch {
      // localStorage unavailable
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD_HASH) {
      try {
        localStorage.setItem(STORAGE_KEY, PASSWORD_HASH);
      } catch {
        // localStorage unavailable
      }
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-violet-600" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white">
            S
          </div>
          <h1 className="text-2xl font-bold">Shadow PRD</h1>
          <p className="mt-1 text-sm text-muted">
            Enter the password to view this document.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors ${
              error
                ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-zinc-200 bg-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            }`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-violet-600 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Enter
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Internal document — do not share externally.
        </p>
      </div>
    </div>
  );
}
