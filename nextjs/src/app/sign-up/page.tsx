import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import SignUpForm from "./_components/SignUpForm";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/logged-in");
  }

  return <SignUpForm />;
}
