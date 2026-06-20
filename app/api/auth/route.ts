import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const USER = process.env.AUTH_USER ?? "admin";
const PASS = process.env.AUTH_PASS ?? "agentschool2026";
const SECRET = process.env.AUTH_SECRET ?? "as_valid_session";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.user === USER && body.pass === PASS) {
    const store = await cookies();
    store.set("as_auth", SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "帳號或密碼錯誤" }, { status: 401 });
}

export async function DELETE() {
  const store = await cookies();
  store.delete("as_auth");
  return NextResponse.json({ ok: true });
}
