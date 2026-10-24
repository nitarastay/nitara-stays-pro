import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { DbPhoto, DbReview, Hidden } from "@/lib/site-content";

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    staleTime: 60_000,
    queryFn: async () => {
      const [r, p, h] = await Promise.all([
        supabase.from("reviews").select("id,name,quote").order("created_at", { ascending: false }),
        supabase.from("site_photos").select("*").order("created_at", { ascending: false }),
        supabase.from("hidden_items").select("kind,item_key"),
      ]);
      return {
        reviews: (r.data ?? []) as DbReview[],
        photos: (p.data ?? []) as DbPhoto[],
        hidden: (h.data ?? []) as Hidden[],
      };
    },
  });
}

export const emptyContent = { reviews: [] as DbReview[], photos: [] as DbPhoto[], hidden: [] as Hidden[] };
