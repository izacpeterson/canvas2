INSERT INTO public.faculty (firstname, lastname, email, school_id, position)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (email)
DO UPDATE SET
  firstname = EXCLUDED.firstname,
  lastname = EXCLUDED.lastname,
  school_id = EXCLUDED.school_id,
  position = EXCLUDED.position
RETURNING *;
