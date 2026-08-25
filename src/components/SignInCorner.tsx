"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Step = "choose" | "phone" | "otp";

export function SignInCorner({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("choose");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerClass =
    variant === "light"
      ? "rounded-full border border-[#2a1a14]/15 bg-white px-3 py-2 text-xs font-semibold text-[#2a1a14] hover:bg-[#2a1a14]/05 md:px-4 md:text-sm"
      : "rounded-full border border-[#fff8f2]/35 bg-[#fff8f2]/10 px-3 py-2 text-xs font-semibold text-[#fff8f2] backdrop-blur transition hover:bg-[#fff8f2]/18 md:px-4 md:text-sm";

  const sessionClass =
    variant === "light"
      ? "flex max-w-[9rem] items-center gap-2 truncate rounded-full border border-[#2a1a14]/15 bg-white px-3 py-2 text-xs font-semibold text-[#2a1a14] hover:bg-[#2a1a14]/05"
      : "flex max-w-[9rem] items-center gap-2 truncate rounded-full border border-[#fff8f2]/35 bg-[#fff8f2]/10 px-3 py-2 text-xs font-semibold text-[#fff8f2] backdrop-blur hover:bg-[#fff8f2]/18";

  const loadingClass =
    variant === "light"
      ? "rounded-full bg-[#2a1a14]/08 px-3 py-2 text-xs text-[#5c463c]"
      : "rounded-full bg-[#fff8f2]/15 px-3 py-2 text-xs text-[#fff8f2]/80";


  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setStep("choose");
    setError("");
    setOtp("");
    setDemoOtp("");
    setBusy(false);
  }

  async function sendOtp() {
    setBusy(true);
    setError("");
    setDemoOtp("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = (await res.json()) as {
        error?: string;
        demoOtp?: string;
        phone?: string;
      };
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      if (data.phone) setPhone(data.phone.replace(/^91/, ""));
      if (data.demoOtp) setDemoOtp(data.demoOtp);
      setStep("otp");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    setBusy(true);
    setError("");
    try {
      const fullPhone = phone.replace(/\D/g, "").length === 10
        ? `91${phone.replace(/\D/g, "")}`
        : phone.replace(/\D/g, "");

      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, otp }),
      });
      const data = (await res.json()) as {
        error?: string;
        ticket?: string;
        phone?: string;
      };
      if (!res.ok || !data.ticket || !data.phone) {
        throw new Error(data.error || "OTP verification failed");
      }

      const result = await signIn("phone", {
        phone: data.phone,
        token: data.ticket,
        redirect: false,
      });
      if (result?.error) throw new Error("Could not create session");
      close();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  if (status === "loading") {
    return <span className={loadingClass}>…</span>;
  }

  if (session?.user) {
    const label =
      session.user.name?.replace(/@phone\.local/, "") ||
      session.user.email?.split("@")[0] ||
      "Signed in";
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={sessionClass}
        >
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt=""
              className="h-5 w-5 rounded-full"
            />
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c45c6a] text-[10px]">
              {label.slice(0, 1).toUpperCase()}
            </span>
          )}
          <span className="truncate">{label}</span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl bg-[#fffaf5] shadow-lg">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block w-full px-4 py-3 text-left text-sm text-[#2a1a14] hover:bg-[#2a1a14]/06"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClass}
      >
        Sign in
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#1a100c]/65 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-title"
          onClick={close}
        >
          <div
            className="animate-rise w-full max-w-md rounded-[1.75rem] bg-[#fffaf5] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#c45c6a] uppercase">
                  Welcome
                </p>
                <h2
                  id="signin-title"
                  className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#2a1a14]"
                >
                  Sign in
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1a14]/08 text-lg text-[#2a1a14]"
              >
                ×
              </button>
            </div>

            {step === "choose" && (
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-[#2a1a14]/12 bg-white px-5 py-3 text-sm font-semibold text-[#2a1a14] transition hover:bg-[#2a1a14]/04"
                >
                  <GoogleIcon />
                  Continue with Gmail
                </button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f6b45] px-5 py-3 text-sm font-semibold text-[#fff8f2] transition hover:bg-[#185537]"
                >
                  Continue with mobile OTP
                </button>
              </div>
            )}

            {step === "phone" && (
              <div className="mt-6 space-y-4">
                <label className="block text-sm">
                  <span className="font-medium text-[#2a1a14]">
                    Mobile number
                  </span>
                  <div className="mt-1 flex overflow-hidden rounded-xl border border-[#2a1a14]/12 bg-white">
                    <span className="flex items-center bg-[#2a1a14]/05 px-3 text-sm text-[#5c463c]">
                      +91
                    </span>
                    <input
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className="w-full px-3 py-3 text-sm outline-none"
                    />
                  </div>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="rounded-full border border-[#2a1a14]/15 px-4 py-3 text-sm font-semibold text-[#2a1a14]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={busy || phone.length !== 10}
                    onClick={sendOtp}
                    className="flex-1 rounded-full bg-[#1f6b45] px-5 py-3 text-sm font-semibold text-[#fff8f2] disabled:opacity-50"
                  >
                    {busy ? "Sending…" : "Send OTP"}
                  </button>
                </div>
              </div>
            )}

            {step === "otp" && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-[#5c463c]">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-semibold text-[#2a1a14]">
                    +91 {phone.slice(-10)}
                  </span>
                </p>
                {demoOtp && (
                  <p className="rounded-xl bg-[#1f6b45]/10 px-3 py-2 text-sm text-[#1f6b45]">
                    Demo OTP (SMS not configured yet):{" "}
                    <strong className="tracking-widest">{demoOtp}</strong>
                  </p>
                )}
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="w-full rounded-xl border border-[#2a1a14]/12 bg-white px-4 py-3 text-center text-lg tracking-[0.4em] outline-none focus:border-[#1f6b45]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("phone");
                      setOtp("");
                      setDemoOtp("");
                    }}
                    className="rounded-full border border-[#2a1a14]/15 px-4 py-3 text-sm font-semibold text-[#2a1a14]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={busy || otp.length !== 6}
                    onClick={verifyOtp}
                    className="flex-1 rounded-full bg-[#1f6b45] px-5 py-3 text-sm font-semibold text-[#fff8f2] disabled:opacity-50"
                  >
                    {busy ? "Verifying…" : "Verify & sign in"}
                  </button>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={sendOtp}
                  className="text-sm font-medium text-[#c45c6a]"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {error && (
              <p className="mt-4 rounded-xl bg-[#c45c6a]/10 px-3 py-2 text-sm text-[#9a3040]">
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 18.9 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.2 5.2C39.2 37.2 44 32 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}
