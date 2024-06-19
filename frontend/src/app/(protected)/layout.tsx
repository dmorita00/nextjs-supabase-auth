import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return <main>{children}</main>;
}
