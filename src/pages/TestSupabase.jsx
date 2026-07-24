import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {

  useEffect(() => {

    async function test() {

      const { data, error } = await supabase
        .from("websites")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

    }

    test();

  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-3xl text-white">
      Testing Supabase...
    </div>
  );
}