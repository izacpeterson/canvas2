INSERT INTO public.students (firstname, lastname, dob, school_id, email)
VALUES ($1, $2, $3, $4, $5)
ON CONFLICT (email)
DO UPDATE SET
  firstname = EXCLUDED.firstname,
  lastname = EXCLUDED.lastname,
  dob = EXCLUDED.dob,
  school_id = EXCLUDED.school_id
RETURNING *;
