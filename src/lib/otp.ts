import { createHmac, randomInt, timingSafeEqual } from "crypto";

const COOKIE = "mhc_otp_challenge";
const TICKET_TTL_MS = 10 * 60 * 1000;
const OTP_TTL_MS = 5 * 60 * 1000;

function secret() {
  return process.env.AUTH_SECRET || "dev-secret";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function seal(data: object) {
  const body = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function unseal<T>(token: string): T | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

export function isValidIndianMobile(phone: string) {
  return /^91[6-9]\d{9}$/.test(phone);
}

export function createOtpChallenge(phone: string) {
  const otp = String(randomInt(100000, 999999));
  const challenge = seal({
    phone,
    otpHash: sign(`otp:${phone}:${otp}`),
    exp: Date.now() + OTP_TTL_MS,
  });
  return { otp, challenge, cookieName: COOKIE };
}

export function verifyOtpAgainstChallenge(
  challengeToken: string,
  phone: string,
  otp: string,
) {
  const data = unseal<{ phone: string; otpHash: string; exp: number }>(
    challengeToken,
  );
  if (!data) return false;
  if (data.phone !== phone) return false;
  if (Date.now() > data.exp) return false;
  const hash = sign(`otp:${phone}:${otp}`);
  try {
    const a = Buffer.from(hash);
    const b = Buffer.from(data.otpHash);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Short-lived ticket proving phone OTP was verified — used by Credentials sign-in */
export function mintPhoneTicket(phone: string) {
  return seal({ phone, exp: Date.now() + TICKET_TTL_MS, kind: "phone-ok" });
}

export function verifyPhoneTicket(ticket: string, phone: string) {
  const data = unseal<{ phone: string; exp: number; kind: string }>(ticket);
  if (!data) return false;
  if (data.kind !== "phone-ok") return false;
  if (data.phone !== phone) return false;
  if (Date.now() > data.exp) return false;
  return true;
}

export { COOKIE as OTP_COOKIE };

export async function sendOtpSms(phone: string, otp: string) {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;

  if (authKey && templateId) {
    const res = await fetch("https://control.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: {
        authkey: authKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: templateId,
        short_url: "0",
        recipients: [{ mobiles: phone, otp }],
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`MSG91 failed: ${text}`);
    }
    return { demo: false as const };
  }

  // Demo / until SMS is configured
  if (process.env.OTP_DEMO_MODE === "true") {
    return { demo: true as const, otp };
  }

  throw new Error(
    "SMS not configured. Set MSG91_AUTH_KEY + MSG91_TEMPLATE_ID, or OTP_DEMO_MODE=true.",
  );
}
