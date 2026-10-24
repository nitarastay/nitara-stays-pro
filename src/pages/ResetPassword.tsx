import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message); else nav("/admin");
  };
  return (
    <section className="min-h-screen pt-32 pb-20 bg-ivory">
      <form onSubmit={submit} className="max-w-md mx-auto bg-white p-8 space-y-4">
        <h1 className="font-serif text-3xl">Set a new password</h1>
        <input type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 border border-border bg-background outline-none focus:border-gold" />
        {msg && <p className="text-sm text-destructive">{msg}</p>}
        <button className="btn-gold">Save password</button>
      </form>
    </section>
  );
}
