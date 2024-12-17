SELECT f.*, s.name as school_name, s.level as school_level
FROM faculty f 
JOIN schools s ON f.school_id = s.id
WHERE f.email = $1
