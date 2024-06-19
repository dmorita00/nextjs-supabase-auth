"use client";
import { createClient } from "@/libs/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [hasError, setHasError] = useState(false);
  const supabase = createClient();

  ("use server");
  const formAction = async (formData: FormData) => {
    const password = formData.get("password") as string;
    if (!password) {
      setHasError(true);
      return;
    }

    try {
      const res = await supabase.auth.updateUser({
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
    await supabase.auth.signOut();
    redirect("/sign-in");
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
      <div>パスワード変更</div>
      <label>
        パスワード
        <input type="password" name="password" />
      </label>
      <button type="submit">変更する</button>
      {hasError && <div>エラーが発生しました。</div>}
    </form>
  );
}
