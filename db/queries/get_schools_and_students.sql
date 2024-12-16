SELECT
    schools.id AS school_id,
    schools.name AS school_name,
    districts.name AS district_name,
    schools.district_id,
    schools.level,
    schools.mascot,
    students.id AS student_id,
    students.firstname AS student_firstname,
    students.lastname AS student_lastname,
    students.dob AS student_dob,
    students.email AS student_email
FROM
    public.schools
LEFT JOIN
    public.districts
ON
    schools.district_id = districts.id
LEFT JOIN
    public.students
ON
    schools.id = students.school_id
WHERE
    schools.id = $1;
