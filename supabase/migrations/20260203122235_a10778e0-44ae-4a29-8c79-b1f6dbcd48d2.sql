-- Fix user_roles table security: Block all public write operations
-- The table currently only has an admin SELECT policy, leaving it vulnerable to privilege escalation

-- Block public INSERT on user_roles (prevent anyone from adding themselves as admin)
CREATE POLICY "Block public insert on user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO public
WITH CHECK (false);

-- Block public UPDATE on user_roles (prevent role modification)
CREATE POLICY "Block public update on user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO public
USING (false)
WITH CHECK (false);

-- Block public DELETE on user_roles (prevent role removal)
CREATE POLICY "Block public delete on user_roles"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO public
USING (false);

-- Allow admins to manage all roles (INSERT/UPDATE/DELETE)
CREATE POLICY "Admins can manage user roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));