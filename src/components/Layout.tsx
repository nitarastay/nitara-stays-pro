import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import { useReveal } from "@/hooks/useReveal";

export default function Layout({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
