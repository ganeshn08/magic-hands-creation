import { NextResponse } from "next/server";
import {
  isValidIndianMobile,
  mintPhoneTicket,
  normalizePhone,
  OTP_COOKIE,
  verifyOtpAgainstChallenge,
} from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { phone?: string; otp?: string };
    const phone = normalizePhone(body.phone || "");
    const otp = String(body.otp || "").replace(/\D/g, "");

    if (!isValidIndianMobile(phone) || otp.length !== 6) {
      return NextResponse.json(
        { error: "Invalid phone or OTP." },
        { status: 400 },
      );
    }

    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${OTP_COOKIE}=`));
    const challenge = match?.slice(OTP_COOKIE.length + 1) || "";

    if (!challenge || !verifyOtpAgainstChallenge(challenge, phone, otp)) {
      return NextResponse.json(
        { error: "Incorrect or expired OTP. Try again." },
        { status: 401 },
      );
    }

    const ticket = mintPhoneTicket(phone);
    const res = NextResponse.json({ ok: true, phone, ticket });
    res.cookies.set(OTP_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
    return res;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Verification failed" },
      { status: 500 },
    );
  }
}
