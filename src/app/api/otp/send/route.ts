import { NextResponse } from "next/server";
import {
  createOtpChallenge,
  isValidIndianMobile,
  normalizePhone,
  OTP_COOKIE,
  sendOtpSms,
} from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { phone?: string };
    const phone = normalizePhone(body.phone || "");
    if (!isValidIndianMobile(phone)) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit Indian mobile number." },
        { status: 400 },
      );
    }

    const { otp, challenge } = createOtpChallenge(phone);
    const sms = await sendOtpSms(phone, otp);

    const res = NextResponse.json({
      ok: true,
      phone,
      demo: sms.demo,
      ...(sms.demo ? { demoOtp: sms.otp } : {}),
    });

    res.cookies.set(OTP_COOKIE, challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    });

    return res;
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Could not send OTP" },
      { status: 500 },
    );
  }
}
