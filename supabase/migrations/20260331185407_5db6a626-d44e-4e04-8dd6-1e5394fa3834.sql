DROP POLICY "Admins can manage experiences" ON public.experiences;
CREATE POLICY "Admins can manage experiences"
  ON public.experiences FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));