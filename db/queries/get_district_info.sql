SELECT d.id, d.name, COUNT(s.id) AS school_count, COUNT(st.id) AS student_count
FROM districts d
LEFT JOIN schools s ON d.id = s.district_id
LEFT JOIN students st ON s.id = st.school_id
GROUP BY d.id;
