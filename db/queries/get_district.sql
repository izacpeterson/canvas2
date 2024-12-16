SELECT d.*, 
       s.*, 
       d.name AS district_name, 
       CONCAT(s.name, ' ', s.level, ' ', 'School') AS full_name, 
       CONCAT(d.name, ' School District') AS district_full_name,
       COUNT(st.id) AS student_count
FROM districts d
LEFT JOIN schools s ON d.id = s.district_id
LEFT JOIN students st ON s.id = st.school_id
WHERE d.id = $1
GROUP BY d.id, s.id
ORDER BY s.id;
