CREATE TABLE public.room_prices (room_id text PRIMARY KEY, price integer NOT NULL CHECK (price > 0), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.room_prices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.room_prices TO authenticated;
GRANT ALL ON public.room_prices TO service_role;
ALTER TABLE public.room_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads prices" ON public.room_prices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage prices" ON public.room_prices FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));