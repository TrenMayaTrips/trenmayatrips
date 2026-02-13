
-- Create table for saved itineraries
CREATE TABLE public.saved_itineraries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code text NOT NULL UNIQUE DEFAULT substr(replace(gen_random_uuid()::text, '-', ''), 1, 8),
  trip_type text NOT NULL,
  duration integer NOT NULL,
  destinations jsonb NOT NULL,
  lodging jsonb NOT NULL,
  total_cost numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_itineraries ENABLE ROW LEVEL SECURITY;

-- Anyone can view a saved itinerary (for sharing)
CREATE POLICY "Anyone can view saved itineraries"
ON public.saved_itineraries
FOR SELECT
USING (true);

-- Anyone can create an itinerary (no auth required)
CREATE POLICY "Anyone can save itineraries"
ON public.saved_itineraries
FOR INSERT
WITH CHECK (true);
