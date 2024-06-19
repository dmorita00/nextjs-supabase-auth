import { createClient } from "@/libs/supabase/server";
import { AuthTokenResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const baseUrl = request.nextUrl.origin;

  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(`${baseUrl}/sign-up`);
  }

  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/sign-up`);
  }

  const { data, error: signInError } =
    (await supabase.auth.exchangeCodeForSession(code)) as AuthTokenResponse & {
      data: { redirectType?: string };
    };
  if (signInError || !data) {
    return NextResponse.redirect(`${baseUrl}/sign-up`);
  }

  if (data.redirectType === "PASSWORD_RECOVERY") {
    return NextResponse.redirect(`${baseUrl}/change-password`);
  }

  return NextResponse.redirect(`${baseUrl}/logged-in`);
}
