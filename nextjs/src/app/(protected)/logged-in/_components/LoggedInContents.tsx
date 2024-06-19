"use client";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoggedInContents() {
  const [hasError, setHasError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  ("use server");
  const logout = async () => {
    try {
      const res = await supabase.auth.signOut();
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
      return;
    }
    router.replace("/sign-in");
  };

  ("use server");
  const resetPassword = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      console.error(error);
      setHasError(true);
      return;
    }

    try {
      const res = await supabase.auth.resetPasswordForEmail(user.email!, {
        redirectTo: `${location.origin}/callback`,
      });
      if (res.error) {
        throw res.error;
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
      return;
    }
    setIsSent(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        padding: "32px",
      }}
    >
      Logged In!
      <button onClick={resetPassword}>パスワード変更</button>
      {hasError && <div>エラーが発生しました。</div>}
      {isSent && <div>メールを送信しました。</div>}
      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
