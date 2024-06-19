"use client";
import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [hasError, setHasError] = useState(false);
  const supabase = createClient();

  ("use server");
  const formAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
      return;
    }
    redirect("/logged-in");
  };

  return (
    <form
      action={formAction}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <div>ログイン</div>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Submit</button>
      {hasError && <div>エラーが発生しました。</div>}
      <Link href="/sign-up">会員登録へ</Link>
    </form>
  );
}
