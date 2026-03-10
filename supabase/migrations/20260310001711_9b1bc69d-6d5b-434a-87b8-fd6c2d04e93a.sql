
-- Drop overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can save itineraries" ON public.saved_itineraries;

-- Replace with restrictive policies that deny direct client inserts
-- All inserts now go through edge functions using service_role_key (bypasses RLS)
-- These policies block any direct anonymous/authenticated client insert attempts
CREATE POLICY "Deny direct inserts to contact_messages"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "Deny direct inserts to newsletter_subscribers"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (false);

CREATE POLICY "Deny direct inserts to saved_itineraries"
ON public.saved_itineraries
FOR INSERT
TO public
WITH CHECK (false);
