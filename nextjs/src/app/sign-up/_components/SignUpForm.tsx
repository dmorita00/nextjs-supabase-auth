"use client";
import { createClient } from "@/libs/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const supabase = createClient();
  const [hasError, setHasError] = useState(false);
  const [completed, setCompleted] = useState(false);

  ("use server");
  const formAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/callback` },
      });
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
      return;
    }
    setCompleted(true);
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
      <div>会員登録</div>
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <button type="submit">Submit</button>
      {hasError && <div>エラーが発生しました。</div>}
      {completed && <div>メールを送信しました。</div>}
      <Link href="/sign-in">ログインへ</Link>
    </form>
  );
}
