import { siteMedia } from "@/data/site-media";
import { useEffect, useState } from "react";
const nitaraLogo = siteMedia["nitara-wordmark.png"];

export default function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 450);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center loader-fade">
      <img src={nitaraLogo} alt="Nitara Stays" className="h-auto w-[230px] brightness-0 invert mb-6" />
      <div className="w-48 h-px bg-white/20 overflow-hidden">
        <div className="h-full bg-gold loader-bar" />
      </div>
    </div>
  );
}
